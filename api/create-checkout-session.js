const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// 🔥 Liste des codes promo valides (à synchroniser avec le frontend)
const VALID_COUPONS = {
  'BIENVENUE10': { type: 'percent', value: 10 },
  'JOYEUX2026': { type: 'fixed', value: 10 },
  'STYLE10': { type: 'fixed', value: 10 },
  'PROMO5': { type: 'fixed', value: 5 },
};

module.exports = async (req, res) => {
  // 1. CORS - Permettre les requêtes du frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { items, coupon, userId = 'guest' } = req.body;

    // 2. Validation des données
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Panier vide' });
    }

    // 3. Calcul du total pour validation
    const subtotal = items.reduce((sum, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return sum + price * quantity;
    }, 0);

    if (subtotal <= 0) {
      return res.status(400).json({ error: 'Montant invalide' });
    }

    // 4. Vérification du stock (à connecter à ta DB)
    // ⚠️ À remplacer par une vraie vérification en base de données
    const stockCheck = await checkStock(items);
    if (!stockCheck.valid) {
      return res.status(400).json({ 
        error: 'Stock insuffisant',
        outOfStock: stockCheck.outOfStock 
      });
    }

    // 5. Construction des line_items
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          description: item.category || 'Vêtement premium',
          images: item.image ? [item.image] : [],
          metadata: {
            product_id: String(item.id),
            category: item.category || 'vetements',
          }
        },
        unit_amount: Math.round(parseFloat(item.price) * 100),
      },
      quantity: parseInt(item.quantity) || 1,
    }));

    // 6. Gestion des codes promo
    let discount = null;
    let discountAmount = 0;
    
    if (coupon && VALID_COUPONS[coupon]) {
      const couponData = VALID_COUPONS[coupon];
      discount = couponData;
      
      if (couponData.type === 'fixed') {
        discountAmount = couponData.value;
      } else if (couponData.type === 'percent') {
        discountAmount = (subtotal * couponData.value) / 100;
      }
      
      // Créer un coupon Stripe
      const stripeCoupon = await stripe.coupons.create({
        [couponData.type === 'percent' ? 'percent_off' : 'amount_off']: 
          couponData.type === 'percent' ? couponData.value : couponData.value * 100,
        duration: 'once',
        name: `Code: ${coupon}`,
      });
    }

    // 7. Création de la session
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'https://nordexx-chi.vercel.app';

    const sessionConfig = {
      payment_method_types: ['card', 'klarna', 'bancontact', 'giropay', 'sofort'],
      mode: 'payment',
      line_items: lineItems,
      
      // 📦 Livraison
      shipping_address_collection: {
        allowed_countries: ['FR', 'BE', 'DE', 'ES', 'IT', 'NL', 'LU', 'CH'],
      },
      
      // 📱 Téléphone
      phone_number_collection: {
        enabled: true,
      },
      
      // 👤 Client
      customer_creation: 'always',
      
      // 🔗 URLs de redirection
      success_url: `${baseUrl}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/?cancel=true`,
      
      // 📊 Métadonnées pour le suivi
      metadata: {
        user_id: userId,
        subtotal: subtotal.toString(),
        coupon_used: coupon || 'none',
        discount_amount: discountAmount.toString(),
        items_count: items.reduce((sum, i) => sum + (i.quantity || 1), 0).toString(),
        source: 'nordexx_web',
        timestamp: Date.now().toString(),
      },
      
      // 🏷️ Options de livraison (optionnel)
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 0,
              currency: 'eur',
            },
            display_name: 'Livraison offerte',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 1 },
              maximum: { unit: 'business_day', value: 2 },
            },
          },
        },
      ],
    };

    // Ajouter la réduction si applicable
    if (discount) {
      const stripeCoupon = await stripe.coupons.create({
        [discount.type === 'percent' ? 'percent_off' : 'amount_off']: 
          discount.type === 'percent' ? discount.value : discount.value * 100,
        duration: 'once',
        name: `Code: ${coupon}`,
      });
      
      sessionConfig.discounts = [{
        coupon: stripeCoupon.id,
      }];
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    // 8. Log pour debug
    console.log('✅ Session Stripe créée:', {
      sessionId: session.id,
      userId,
      coupon: coupon || 'none',
      subtotal,
      discount: discountAmount,
      total: subtotal - discountAmount,
    });

    // 9. Retourner l'URL
    return res.status(200).json({
      url: session.url,
      sessionId: session.id,
    });

  } catch (error) {
    console.error('❌ Erreur Stripe:', error);
    
    // Erreurs spécifiques
    if (error.type === 'StripeInvalidRequestError') {
      return res.status(400).json({ 
        error: 'Requête invalide',
        details: error.message 
      });
    }
    
    if (error.type === 'StripeRateLimitError') {
      return res.status(429).json({ 
        error: 'Trop de requêtes, veuillez réessayer plus tard' 
      });
    }
    
    return res.status(500).json({
      error: 'Erreur lors de la création du paiement',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// 🔧 Fonction de vérification de stock (à connecter à ta DB)
async function checkStock(items) {
  // ⚠️ À remplacer par une vraie vérification en base de données
  const outOfStock = [];
  
  for (const item of items) {
    // Exemple : chercher le produit dans ta base
    // const product = await db.findProduct(item.id);
    // if (!product || product.stock < item.quantity) {
    //   outOfStock.push(item.name);
    // }
  }
  
  return {
    valid: outOfStock.length === 0,
    outOfStock,
  };
}
