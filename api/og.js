// api/og.js
// Ce fichier permet à WhatsApp/Facebook/Twitter de voir la bonne image

const products = {
    '1': { 
        name: 'T-shirt Summer', 
        image: 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000136560_eixfr7',
        price: '25.96',
        desc: 'T-shirt estival en coton doux, imprimé original.'
    },
    '2': { 
        name: 'Tshirt Blanc Coton', 
        image: 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000143347_ttqayv',
        price: '21.90',
        desc: 'T-shirt blanc 100% coton bio. Confort absolu.'
    },
    '3': { 
        name: 'Montre connectée', 
        image: 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000143357_mfpyic',
        price: '35.00',
        desc: 'Montre connectée homme & femme. Écran AMOLED.'
    },
    '4': { 
        name: 'Pull Bleu Turquoise', 
        image: 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000142364_btulbg',
        price: '39.00',
        desc: 'Pull en maille douce, couleur bleu turquoise.'
    },
    '5': { 
        name: 'Hoodie Premium', 
        image: 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000142320_spxhgb',
        price: '49.90',
        desc: 'Hoodie avec capuche doublée, poche kangourou.'
    },
    '6': { 
        name: 'Pull Marrant', 
        image: 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000142350_imvwly',
        price: '30.90',
        desc: 'Pull avec imprimé original et humoristique.'
    },
    '7': { 
        name: 'Casquette Outdoor', 
        image: 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000143372_spatwa',
        price: '14.90',
        desc: 'Casquette premium à bec de canard. Protection UV.'
    },
    '8': { 
        name: 'T-Shirt Logo', 
        image: 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000142507_qczqag',
        price: '21.99',
        desc: 'T-shirt avec logo brodé. Coton peigné.'
    },
    '9': { 
        name: 'Pull Hiver', 
        image: 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000142368_c8rtpd',
        price: '35.00',
        desc: 'Pull col rond, maille épaisse. Idéal pour l\'hiver.'
    }
};

const defaultImage = 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000143347_ttqayv';

module.exports = (req, res) => {
    const { product } = req.query;
    const p = products[product] || null;
    
    // Si pas de produit ou produit invalide, retourner la page d'accueil
    if (!p) {
        const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0; url=/">
    <title>StyleShop Nordexx</title>
</head>
<body>
    <p>Redirection vers StyleShop...</p>
</body>
</html>
        `;
        res.setHeader('Content-Type', 'text/html');
        return res.send(html);
    }
    
    // Générer la page avec les métadonnées du produit
    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${p.name} · StyleShop Nordexx</title>
    
    <!-- ===== OPEN GRAPH ===== -->
    <meta property="og:site_name" content="StyleShop Nordexx" />
    <meta property="og:title" content="${p.name} · StyleShop Nordexx | ${p.price}€" />
    <meta property="og:description" content="${p.desc}" />
    <meta property="og:image" content="${p.image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content="https://nordexx-chi.vercel.app/?product=${product}" />
    <meta property="og:type" content="product" />
    <meta property="og:locale" content="fr_FR" />
    
    <!-- ===== TWITTER CARD ===== -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${p.name} · StyleShop Nordexx" />
    <meta name="twitter:description" content="${p.desc}" />
    <meta name="twitter:image" content="${p.image}" />
    
    <!-- ===== REDIRECTION VERS LA SPA ===== -->
    <meta http-equiv="refresh" content="0; url=/?product=${product}" />
    
    <!-- ===== SCHEMA.ORG PRODUIT ===== -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "${p.name}",
        "description": "${p.desc}",
        "image": "${p.image}",
        "offers": {
            "@type": "Offer",
            "price": "${p.price}",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock"
        },
        "brand": {
            "@type": "Brand",
            "name": "StyleShop/Nordexx"
        }
    }
    </script>
</head>
<body style="font-family: Arial; text-align: center; padding: 50px; background: #f8f6f2;">
    <div style="max-width: 500px; margin: 0 auto; background: white; padding: 30px; border-radius: 20px;">
        <img src="${p.image}" alt="${p.name}" style="width: 100%; max-width: 300px; border-radius: 10px;">
        <h1 style="font-size: 24px; margin: 20px 0 10px;">${p.name}</h1>
        <p style="font-size: 28px; color: #c0392b; font-weight: bold;">${p.price} €</p>
        <p style="color: #666;">${p.desc}</p>
        <p style="margin-top: 20px; font-size: 14px; color: #999;">⏳ Redirection vers le produit...</p>
        <a href="/?product=${product}" style="display: inline-block; margin-top: 15px; padding: 10px 30px; background: #1e1e1e; color: white; border-radius: 30px; text-decoration: none;">Voir le produit →</a>
    </div>
</body>
</html>
    `;
    
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(html);
};
