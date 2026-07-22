// api/create-checkout-session.js
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
    // ============================================================
    // 1. GESTION CORS
    // ============================================================
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
        const { items, total, coupon } = req.body;

        // ============================================================
        // 2. VALIDATION
        // ============================================================
        if (!items || items.length === 0) {
            return res.status(400).json({ error: 'Panier vide' });
        }

        // ============================================================
        // 3. URL DE BASE - CORRIGÉE
        // ============================================================
        // Utiliser une URL fixe ou détecter automatiquement
        let baseUrl = 'https://nordexx-chi.vercel.app'; // ⚠️ Remplacez par VOTRE URL
        
        // Si vous êtes en développement local
        if (process.env.NODE_ENV === 'development' || req.headers.host?.includes('localhost')) {
            baseUrl = 'http://localhost:3000';
        }
        
        // Si Vercel fournit l'URL
        if (process.env.VERCEL_URL) {
            baseUrl = `https://${process.env.VERCEL_URL}`;
        }

        console.log('🔗 Base URL:', baseUrl);

        // ============================================================
        // 4. CRÉATION DE LA SESSION STRIPE
        // ============================================================
        const sessionData = {
            payment_method_types: ['card'], // ⚠️ Klarna nécessite une activation spéciale
            
            mode: 'payment',
            
            line_items: items.map(item => ({
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: item.name,
                        description: item.variants ? 
                            `Taille: ${item.variants.taille || 'Unique'} · Couleur: ${item.variants.couleur || 'Standard'}` : 
                            '',
                        images: item.image ? [item.image] : [],
                        metadata: {
                            product_id: String(item.id),
                            category: item.category || 'vetements'
                        }
                    },
                    unit_amount: Math.round(item.price * 100),
                },
                quantity: item.quantity,
            })),
            
            // ===== COLLECTE DE L'ADRESSE =====
            shipping_address_collection: {
                allowed_countries: ['FR', 'BE', 'DE', 'ES', 'IT', 'NL', 'CH', 'LU']
            },
            
            // ===== COLLECTE DU TÉLÉPHONE =====
            phone_number_collection: {
                enabled: true
            },
            
            // ===== EMAIL CLIENT =====
            customer_creation: 'always',
            
            // ===== MÉTADONNÉES =====
            metadata: {
                coupon: coupon || 'none',
                total: String(total || 0),
                platform: 'vercel'
            },
            
            // ===== URL DE RETOUR =====
            success_url: `${baseUrl}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${baseUrl}/?cancel=true`,
            
            // ===== EXPIRATION =====
            expires_at: Math.floor(Date.now() / 1000) + 1800,
        };

        // ============================================================
        // 5. AJOUT DE KLARNA SEULEMENT SI ACTIVÉ
        // ============================================================
        // Klarna nécessite une activation dans Stripe
        // Si vous voulez l'activer, décommentez cette ligne :
        // sessionData.payment_method_types.push('klarna');

        // ============================================================
        // 6. AJOUT DES OPTIONS DE LIVRAISON (optionnel)
        // ============================================================
        // sessionData.shipping_options = [
        //     {
        //         shipping_rate_data: {
        //             type: 'fixed_amount',
        //             fixed_amount: { amount: 0, currency: 'eur' },
        //             display_name: '🚚 Livraison offerte',
        //             delivery_estimate: {
        //                 minimum: { unit: 'business_day', value: 2 },
        //                 maximum: { unit: 'business_day', value: 4 }
        //             }
        //         }
        //     }
        // ];

        const session = await stripe.checkout.sessions.create(sessionData);

        console.log('✅ Session Stripe créée:', session.id);
        console.log('💰 Total:', total || 'calculé automatiquement');
        console.log('📦 Articles:', items.length);
        console.log('🔗 URL:', session.url);

        return res.status(200).json({
            url: session.url,
            sessionId: session.id
        });

    } catch (error) {
        console.error('❌ Erreur Stripe:', error);
        
        // Message d'erreur plus clair
        let errorMessage = error.message || 'Erreur lors de la création de la session de paiement';
        
        // Si c'est une erreur de clé Stripe
        if (error.type === 'StripeAuthenticationError') {
            errorMessage = 'Clé Stripe invalide. Vérifiez la variable STRIPE_SECRET_KEY.';
        }
        
        // Si c'est une erreur de paramètre
        if (error.type === 'StripeInvalidRequestError') {
            errorMessage = `Paramètre invalide: ${error.message}`;
        }

        return res.status(500).json({
            error: errorMessage,
            code: error.type || 'unknown_error'
        });
    }
};
