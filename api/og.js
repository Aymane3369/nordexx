// api/og.js
module.exports = (req, res) => {
    const { product, blog, about } = req.query;
    
    // Configuration des produits (à synchroniser avec index.html)
    const products = {
        '7': { 
            name: 'Casquette Outdoor', 
            image: 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000143372_spatwa',
            price: '14.90',
            desc: 'Casquette premium à bec de canard. Protection UV, réglable.'
        }
        // ... autres produits
    };
    
    const defaultImage = 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000143347_ttqayv';
    const BASE_URL = 'https://nordexx-chi.vercel.app';
    
    let title = 'StyleShop Nordexx · Vêtements & Accessoires Premium';
    let description = 'L\'alliance de l\'ingénierie et de la mode. Garantie 2 ans.';
    let image = defaultImage;
    let url = BASE_URL;
    let redirectUrl = BASE_URL;
    
    if (product && products[product]) {
        const p = products[product];
        title = p.name + ' · StyleShop Nordexx | ' + p.price + '€';
        description = p.desc;
        image = p.image;
        url = BASE_URL + '/api/og?product=' + product;
        redirectUrl = BASE_URL + '/produit/' + p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + product;
    } else if (blog) {
        title = 'Blog · StyleShop Nordexx | Conseils Mode & Tendances';
        description = 'Retrouvez tous nos conseils mode, guides des tailles et tendances de la saison.';
        url = BASE_URL + '/api/og?blog=true';
        redirectUrl = BASE_URL + '/blog';
    } else if (about) {
        title = 'À propos · StyleShop Nordexx | Ingénierie & Mode Premium';
        description = 'Découvrez l\'histoire de StyleShop/Nordexx, l\'alliance unique de l\'ingénierie et de la mode.';
        url = BASE_URL + '/api/og?about=true';
        redirectUrl = BASE_URL + '/a-propos';
    }
    
    // HTML avec balises OG
    const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${description}">
    
    <!-- Open Graph -->
    <meta property="og:site_name" content="StyleShop Nordexx">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="${url}">
    <meta property="og:type" content="website">
    <meta property="og:image" content="${image}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:locale" content="fr_FR">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${image}">
    
    <!-- Redirection vers la SPA -->
    <meta http-equiv="refresh" content="0;url=${redirectUrl}">
    
    <!-- Schema.org -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "${title.replace(/"/g, '\\"')}",
        "description": "${description.replace(/"/g, '\\"')}",
        "image": "${image}",
        "offers": {
            "@type": "Offer",
            "price": "${products[product]?.price || '0'}",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock"
        }
    }
    </script>
</head>
<body style="font-family: 'Segoe UI', Roboto, sans-serif; text-align: center; padding: 50px; background: #f8f6f2; margin: 0;">
    <div style="max-width: 500px; margin: 0 auto; background: white; padding: 30px; border-radius: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
        <img src="${image}" alt="${title}" style="width: 100%; max-width: 300px; border-radius: 10px; margin-bottom: 20px;">
        <h1 style="font-size: 24px; color: #1e1e1e; margin: 10px 0;">${title}</h1>
        <p style="color: #5e5546; margin: 10px 0;">${description}</p>
        <a href="${redirectUrl}" style="display: inline-block; margin-top: 15px; padding: 12px 30px; background: #1e1e1e; color: white; border-radius: 30px; text-decoration: none; font-weight: 600;">Voir le produit →</a>
    </div>
</body>
</html>`;
    
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.status(200).send(html);
};
