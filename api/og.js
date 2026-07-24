// api/og.js
module.exports = (req, res) => {
    const { product, blog, about } = req.query;
    
    // 📦 Données produits (synchronisées avec index.html)
    const products = {
        '1': { name: "T-shirt d'été", image: "https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000136560_eixfr7", price: "25.96", desc: "T-shirt estival en coton doux, imprimé original. Coupe classique et confortable." },
        '2': { name: "T-shirt blanc coton", image: "https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000143347_ttqayv", price: "21.90", desc: "T-shirt blanc 100% coton bio. Confort absolu et respirabilité." },
        '3': { name: "Montre connectée", image: "https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000143357_mfpyic", price: "35.00", desc: "Montre connectée homme & femme. Écran AMOLED, autonomie 7 jours." },
        '4': { name: "Pull Bleu Turquoise", image: "https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000142364_btulbg", price: "39.00", desc: "Pull en maille douce, couleur bleu turquoise. Coupe droite et moderne." },
        '5': { name: "Hoodie Premium", image: "https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000142320_spxhgb", price: "49.90", desc: "Hoodie avec capuche doublée, poche kangourou. Coton premium." },
        '6': { name: "Pull Marrant", image: "https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000142350_imvwly", price: "30.90", desc: "Pull avec imprimé original et humoristique. 100% coton." },
        '7': { name: "Casquette Outdoor", image: "https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000143372_spatwa", price: "14.90", desc: "Casquette premium à bec de canard. Protection UV, réglable." },
        '8': { name: "T-shirt Logo", image: "https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000142507_qczqag", price: "21.99", desc: "T-shirt avec logo brodé. Coton peigné, finition soignée." },
        '9': { name: "Pull Hiver", image: "https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000142368_c8rtpd", price: "35.00", desc: "Pull col rond, maille épaisse. Idéal pour l'hiver." }
    };
    
    const defaultImage = 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000143347_ttqayv';
    const BASE_URL = 'https://nordexx-chi.vercel.app';
    
    // 🎯 Déterminer les métadonnées
    let title = 'StyleShop Nordexx · Vêtements & Accessoires Premium';
    let description = 'L\'alliance de l\'ingénierie et de la mode. Garantie 2 ans. Livraison offerte dès 50€.';
    let image = defaultImage;
    let url = BASE_URL;
    let productName = '';
    let productPrice = '';
    
    if (product && products[product]) {
        const p = products[product];
        productName = p.name;
        productPrice = p.price;
        title = p.name + ' · StyleShop Nordexx | ' + p.price + '€';
        description = p.desc;
        image = p.image;
        url = BASE_URL + '/api/og?product=' + product;
    } else if (blog) {
        title = 'Blog · StyleShop Nordexx | Conseils Mode & Tendances';
        description = 'Retrouvez tous nos conseils mode, guides des tailles et tendances de la saison.';
        url = BASE_URL + '/api/og?blog=true';
    } else if (about) {
        title = 'À propos · StyleShop Nordexx | Ingénierie & Mode Premium';
        description = 'Découvrez l\'histoire de StyleShop/Nordexx, l\'alliance unique de l\'ingénierie et de la mode.';
        url = BASE_URL + '/api/og?about=true';
    }
    
    // 🔧 HTML UNIQUEMENT POUR LES BALISES OG (SANS REDIRECTION)
    const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${description}">
    
    <!-- ===== OPEN GRAPH ===== -->
    <meta property="og:site_name" content="StyleShop Nordexx">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="${url}">
    <meta property="og:type" content="website">
    <meta property="og:image" content="${image}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:locale" content="fr_FR">
    
    <!-- ===== TWITTER CARD ===== -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${image}">
    
    <!-- ===== SCHEMA.ORG ===== -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "${title.replace(/"/g, '\\"')}",
        "description": "${description.replace(/"/g, '\\"')}",
        "image": "${image}",
        "offers": {
            "@type": "Offer",
            "price": "${productPrice || '0'}",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock"
        }
    }
    </script>
    
    <!-- ===== STYLE POUR L'AFFICHAGE HUMAIN ===== -->
    <style>
        body {
            font-family: 'Segoe UI', Roboto, system-ui, sans-serif;
            text-align: center;
            padding: 40px 20px;
            background: #f8f6f2;
            margin: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .card {
            max-width: 500px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.06);
            border: 1px solid #efebe6;
        }
        .card img {
            width: 100%;
            max-width: 280px;
            border-radius: 12px;
            margin-bottom: 20px;
            aspect-ratio: 1/1;
            object-fit: cover;
        }
        .card h1 {
            font-size: 24px;
            color: #1e1e1e;
            margin: 10px 0 5px;
        }
        .card .price {
            font-size: 28px;
            color: #c0392b;
            font-weight: bold;
            margin: 10px 0;
        }
        .card .desc {
            color: #5e5546;
            margin: 10px 0 20px;
            line-height: 1.6;
        }
        .card .btn {
            display: inline-block;
            padding: 12px 30px;
            background: #1e1e1e;
            color: white;
            border-radius: 30px;
            text-decoration: none;
            font-weight: 600;
            transition: 0.2s;
        }
        .card .btn:hover {
            background: #3f3a32;
            transform: scale(1.02);
        }
        .card .badge {
            display: inline-block;
            background: #e2f0e6;
            color: #2d7a4a;
            padding: 2px 14px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            margin-bottom: 10px;
        }
        .card .footer {
            margin-top: 20px;
            font-size: 0.8rem;
            color: #9b8d7a;
            border-top: 1px solid #e8e2d6;
            padding-top: 15px;
        }
        .share-link {
            margin-top: 15px;
            font-size: 0.75rem;
            color: #7a6f5d;
            word-break: break-all;
        }
        .share-link input {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #d4cdc0;
            border-radius: 8px;
            font-size: 0.8rem;
            background: #f8f6f2;
            color: #1e1e1e;
            margin-top: 5px;
        }
    </style>
</head>
<body>
    <div class="card">
        <img src="${image}" alt="${title}" loading="lazy">
        <div class="badge">🌟 Premium</div>
        <h1>${productName || 'StyleShop Nordexx'}</h1>
        ${productPrice ? '<div class="price">' + productPrice + ' €</div>' : ''}
        <div class="desc">${description}</div>
        <a href="${BASE_URL}" class="btn">🛒 Découvrir la boutique</a>
        <div class="share-link">
            <label style="display:block;margin-bottom:4px;font-weight:500;">📋 Copier le lien</label>
            <input type="text" value="${BASE_URL}" readonly onclick="this.select();document.execCommand('copy');alert('Lien copié !')">
        </div>
        <div class="footer">
            StyleShop / Nordexx · Livraison offerte dès 50€ · Garantie 2 ans
        </div>
    </div>
</body>
</html>`;
    
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.status(200).send(html);
};
