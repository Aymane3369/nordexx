const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { items } = req.body;

    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'https://nordexx-chi.vercel.app';

    const session = await stripe.checkout.sessions.create({

      payment_method_types: [
        'card',
        'klarna'
      ],

      mode: 'payment',

      line_items: items.map(item => ({
        price_data: {
          currency: 'eur',

          product_data: {
            name: item.name,
          },

          unit_amount: Math.round(item.price * 100),
        },

        quantity: item.quantity,
      })),

      // Récupération livraison
      shipping_address_collection: {
        allowed_countries: [
          'FR',
          'BE',
          'DE',
          'ES',
          'IT',
          'NL'
        ]
      },

      // Téléphone client
      phone_number_collection: {
        enabled: true
      },

      // Email client
      customer_creation: 'always',

      success_url:
        `${baseUrl}/?success=true&session_id={CHECKOUT_SESSION_ID}`,

      cancel_url:
        `${baseUrl}/?cancel=true`,
    });


    return res.status(200).json({
      url: session.url
    });

  } catch (error) {

    console.error('❌ Erreur Stripe:', error);

    return res.status(500).json({
      error: error.message
    });
  }
};
