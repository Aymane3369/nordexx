const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  // ✅ Vérification de la méthode HTTP
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 📦 Récupération des données du panier
    const { items, total, coupon } = req.body;

    // 🏠 URL de base
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'https://nordexx-chi.vercel.app';

    // 💰 Calcul du montant total (pour Klarna)
    const totalAmount = Math.round(total * 100);

    // 🛍️ Construction des line_items
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          description: item.category || 'Vêtement premium',
          images: item.image ? [item.image] : [],
          metadata: {
            product_id: String(item.id),
            category: item.category || 'vetements'
          }
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // 🎁 Gestion du code promo (réduction)
    if (coupon) {
      // Ajouter une ligne de réduction négative
      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: `Code promo: ${coupon}`,
            description: 'Réduction appliquée'
          },
          unit_amount: -Math.round(10 * 100), // -10€
        },
        quantity: 1,
      });
    }

    // 🔧 Configuration de la session Stripe
    const session = await stripe.checkout.sessions.create({
      // ✅ Méthodes de paiement activées
      payment_method_types: [
        'card',      // Carte bancaire
        'klarna',    // Klarna (paiement en plusieurs fois)
        'paypal'     // PayPal (optionnel)
      ],

      mode: 'payment',

      // 🛒 Lignes du panier
      line_items: lineItems,

      // 🏠 Adresse de livraison
      shipping_address_collection: {
        allowed_countries: [
          'FR', // France
          'BE', // Belgique
          'DE', // Allemagne
          'ES', // Espagne
          'IT', // Italie
          'NL', // Pays-Bas
          'LU', // Luxembourg
          'CH', // Suisse
          'PT'  // Portugal
        ]
      },

      // 📱 Téléphone client (obligatoire pour Klarna)
      phone_number_collection: {
        enabled: true
      },

      // 📧 Email client (obligatoire pour Klarna)
      customer_creation: 'always',

      // 🏷️ Métadonnées pour le suivi
      metadata: {
        platform: 'StyleShop/Nordexx',
        version: '3.0.0',
        coupon: coupon || 'none'
      },

      // 📋 Configuration Klarna spécifique
      payment_method_options: {
        klarna: {
          // Pays de la marque Klarna
          country: 'FR',
          // Préférence de paiement
          preference: 'none',
          // Produits disponibles
          product: 'payment'
        }
      },

      // 🎨 Personnalisation de la page de paiement
      branding: {
        logo: 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000143347_ttqayv',
        icon: 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000143347_ttqayv',
        name: 'StyleShop Nordexx',
        primary_color: '#1e1e1e'
      },

      // 📊 Taxe (si applicable)
      tax_behavior: 'exclusive',

      // 💰 Devise par défaut
      currency: 'eur',

      // ✅ URLs de redirection
      success_url: `${baseUrl}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/?cancel=true`,

      // 🔄 Mode de paiement (pour Klarna)
      consent_collection: {
        promotions: 'auto',
        terms_of_service: 'auto'
      }
    });

    // 📝 Log de la session créée
    console.log('✅ Session Stripe créée avec succès');
    console.log(`🔗 URL: ${session.url}`);
    console.log(`💳 Méthodes: ${session.payment_method_types.join(', ')}`);

    // 🔄 Retour de l'URL de paiement
    return res.status(200).json({
      url: session.url,
      session_id: session.id,
      payment_methods: session.payment_method_types
    });

  } catch (error) {
    // ❌ Gestion des erreurs
    console.error('❌ Erreur Stripe:', error);
    
    return res.status(500).json({
      error: error.message,
      type: error.type,
      code: error.code,
      param: error.param
    });
  }
};
