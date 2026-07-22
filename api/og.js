// api/og.js
const products = {
    '1': { name: 'T-shirt Summer', image: 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000136560_eixfr7', price: '25.96' },
    '2': { name: 'Tshirt Blanc Coton', image: 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000143347_ttqayv', price: '21.90' },
    '3': { name: 'Montre connectée', image: 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000143357_mfpyic', price: '35.00' },
    '4': { name: 'Pull Bleu Turquoise', image: 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000142364_btulbg', price: '39.00' },
    '5': { name: 'Hoodie Premium', image: 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000142320_spxhgb', price: '49.90' },
    '6': { name: 'Pull Marrant', image: 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000142350_imvwly', price: '30.90' },
    '7': { name: 'Casquette Outdoor', image: 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000143372_spatwa', price: '14.90' },
    '8': { name: 'T-Shirt Logo', image: 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000142507_qczqag', price: '21.99' },
    '9': { name: 'Pull Hiver', image: 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000142368_c8rtpd', price: '35.00' }
};

module.exports = (req, res) => {
    const { product } = req.query;
    const p = products[product] || products['1'];
    
    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta property="og:title" content="${p.name} · StyleShop Nordexx" />
    <meta property="og:description" content="Découvrez ${p.name} à ${p.price}€ sur StyleShop/Nordexx. Garantie 2 ans." />
    <meta property="og:image" content="${p.image}" />
    <meta property="og:url" content="https://nordexx-chi.vercel.app/?product=${product}" />
    <meta property="og:type" content="product" />
    <meta property="og:site_name" content="StyleShop Nordexx" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="${p.image}" />
    <meta http-equiv="refresh" content="0; url=/?product=${product}" />
</head>
<body>
    <h1>${p.name}</h1>
    <p>Redirection vers le produit...</p>
</body>
</html>
    `;
    
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
};
