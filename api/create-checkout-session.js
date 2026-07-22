// api/create-checkout-session.js
// Gestion du paiement Stripe avec Klarna, livraison, et tracking

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
        const { items, total, coupon, shipping } = req.body;

        // ============================================================
        // 2. VALIDATION
        // ============================================================
        if (!items || items.length === 0) {
            return res.status(400).json({ error: 'Panier vide' });
        }

        // ============================================================
        // 3. URL DE BASE
        // ============================================================
        const baseUrl = process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : 'https://nordexx-chi.vercel.app';

        // ============================================================
        // 4. CRÉATION DE LA SESSION STRIPE
        // ============================================================
        const session = await stripe.checkout.sessions.create({
            // Moyens de paiement acceptés
            payment_method_types: [
                'card',          // CB classique
                'klarna'         // Paiement en 3x/4x
            ],

            mode: 'payment',

            // ===== ARTICLES DU PANIER =====
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
                    unit_amount: Math.round(item.price * 100), // Stripe = centimes
                },
                quantity: item.quantity,
            })),

            // ===== COLLECTE DE L'ADRESSE DE LIVRAISON =====
            shipping_address_collection: {
                allowed_countries: [
                    'FR', 'BE', 'DE', 'ES', 'IT', 'NL', 'CH', 'LU', 'MC', 'PT'
                ]
            },

            // ===== COLLECTE DU TÉLÉPHONE =====
            phone_number_collection: {
                enabled: true
            },

            // ===== EMAIL CLIENT =====
            customer_creation: 'always',

            // ===== OPTIONS DE LIVRAISON =====
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 0,
                            currency: 'eur',
                        },
                        display_name: '🚚 Livraison offerte (2-4 jours)',
                        delivery_estimate: {
                            minimum: { unit: 'business_day', value: 2 },
                            maximum: { unit: 'business_day', value: 4 },
                        },
                    },
                },
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 550, // 5.50 €
                            currency: 'eur',
                        },
                        display_name: '🚀 Livraison express (24h)',
                        delivery_estimate: {
                            minimum: { unit: 'business_day', value: 1 },
                            maximum: { unit: 'business_day', value: 1 },
                        },
                    },
                }
            ],

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
            expires_at: Math.floor(Date.now() / 1000) + 1800, // 30 minutes

            // ===== RÉCUPÉRATION DU PANIER =====
            payment_intent_data: {
                metadata: {
                    items_count: String(items.length),
                    total_items: items.reduce((sum, i) => sum + i.quantity, 0)
                }
            }
        });

        // ============================================================
        // 5. LOG DE SUIVI
        // ============================================================
        console.log('✅ Session Stripe créée:', session.id);
        console.log('💰 Total:', total || 'calculé automatiquement');
        console.log('📦 Articles:', items.length);
        console.log('🔗 URL:', session.url);

        // ============================================================
        // 6. RÉPONSE
        // ============================================================
        return res.status(200).json({
            url: session.url,
            sessionId: session.id
        });

    } catch (error) {
        console.error('❌ Erreur Stripe:', error);
        return res.status(500).json({
            error: error.message || 'Erreur lors de la création de la session de paiement'
        });
    }
};
