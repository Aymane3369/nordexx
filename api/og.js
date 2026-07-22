// api/og.js
// Ce fichier génère les métadonnées Open Graph dynamiques
// pour WhatsApp, Facebook, Twitter, etc.

const products = {
    '1': { 
        name: 'T-shirt Summer', 
        image: 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000136560_eixfr7',
        price: '25.96',
        desc: 'T-shirt estival en coton doux, imprimé original. Coupe classique et confortable.'
    },
    '2': { 
        name: 'Tshirt Blanc Coton', 
        image: 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000143347_ttqayv',
        price: '21.90',
        desc: 'T-shirt blanc 100% coton bio. Confort absolu et respirabilité.'
    },
    '3': { 
        name: 'Montre connectée', 
        image: 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000143357_mfpyic',
        price: '35.00',
        desc: 'Montre connectée homme & femme. Écran AMOLED, autonomie 7 jours.'
    },
    '4': { 
        name: 'Pull Bleu Turquoise', 
        image: 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000142364_btulbg',
        price: '39.00',
        desc: 'Pull en maille douce, couleur bleu turquoise. Coupe droite et moderne.'
    },
    '5': { 
        name: 'Hoodie Premium', 
        image: 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000142320_spxhgb',
        price: '49.90',
        desc: 'Hoodie avec capuche doublée, poche kangourou. Coton premium.'
    },
    '6': { 
        name: 'Pull Marrant', 
        image: 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000142350_imvwly',
        price: '30.90',
        desc: 'Pull avec imprimé original et humoristique. 100% coton.'
    },
    '7': { 
        name: 'Casquette Outdoor', 
        image: 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000143372_spatwa',
        price: '14.90',
        desc: 'Casquette premium à bec de canard. Protection UV, réglable.'
    },
    '8': { 
        name: 'T-Shirt Logo', 
        image: 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000142507_qczqag',
        price: '21.99',
        desc: 'T-shirt avec logo brodé. Coton peigné, finition soignée.'
    },
    '9': { 
        name: 'Pull Hiver', 
        image: 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000142368_c8rtpd',
        price: '35.00',
        desc: 'Pull col rond, maille épaisse. Idéal pour l\'hiver. 100% laine mérinos.'
    }
};

const defaultImage = 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000143347_ttqayv';
const BASE_URL = 'https://nordexx-chi.vercel.app';

// ============================================================
//  GÉNÉRATEUR DE PAGE BLOG
// ============================================================
function generateBlogOG() {
    const image = defaultImage;
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Blog · StyleShop Nordexx</title>
    <meta property="og:site_name" content="StyleShop Nordexx" />
    <meta property="og:title" content="Blog · StyleShop Nordexx | Conseils Mode & Tendances" />
    <meta property="og:description" content="Retrouvez tous nos conseils mode, guides des tailles et tendances de la saison sur le blog StyleShop Nordexx." />
    <meta property="og:image" content="${image}" />
    <meta property="og:url" content="${BASE_URL}/blog" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="fr_FR" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="${image}" />
    <meta http-equiv="refresh" content="0; url=/blog" />
</head>
<body style="font-family: 'Segoe UI', Roboto, sans-serif; text-align: center; padding: 50px; background: #f8f6f2; margin: 0;">
    <div style="max-width: 500px; margin: 0 auto; background: white; padding: 40px; border-radius: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
        <h1 style="font-size: 28px; color: #1e1e1e;">📰 Blog StyleShop</h1>
        <p style="color: #5e5546;">Conseils mode, tendances et guides</p>
        <a href="/blog" style="display: inline-block; margin-top: 15px; padding: 12px 30px; background: #1e1e1e; color: white; border-radius: 30px; text-decoration: none; font-weight: 600;">Voir le blog →</a>
    </div>
</body>
</html>`;
}

// ============================================================
//  GÉNÉRATEUR DE PAGE À PROPOS
// ============================================================
function generateAboutOG() {
    const image = defaultImage;
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>À propos · StyleShop Nordexx</title>
    <meta property="og:site_name" content="StyleShop Nordexx" />
    <meta property="og:title" content="À propos · StyleShop Nordexx | Ingénierie & Mode Premium" />
    <meta property="og:description" content="Découvrez l'histoire de StyleShop/Nordexx, l'alliance unique de l'ingénierie et de la mode. Qualité, confiance et expertise." />
    <meta property="og:image" content="${image}" />
    <meta property="og:url" content="${BASE_URL}/about" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="fr_FR" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="${image}" />
    <meta http-equiv="refresh" content="0; url=/about" />
</head>
<body style="font-family: 'Segoe UI', Roboto, sans-serif; text-align: center; padding: 50px; background: #f8f6f2; margin: 0;">
    <div style="max-width: 500px; margin: 0 auto; background: white; padding: 40px; border-radius: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
        <h1 style="font-size: 28px; color: #1e1e1e;">🏪 StyleShop / Nordexx</h1>
        <p style="color: #5e5546;">L'alliance de l'ingénierie et de la mode</p>
        <a href="/about" style="display: inline-block; margin-top: 15px; padding: 12px 30px; background: #1e1e1e; color: white; border-radius: 30px; text-decoration: none; font-weight: 600;">En savoir plus →</a>
    </div>
</body>
</html>`;
}

// ============================================================
//  GÉNÉRATEUR DE PAGE PRODUIT
// ============================================================
function generateProductOG(productId, product) {
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${product.name} · StyleShop Nordexx</title>
    
    <!-- ===== OPEN GRAPH ===== -->
    <meta property="og:site_name" content="StyleShop Nordexx" />
    <meta property="og:title" content="${product.name} · StyleShop Nordexx | ${product.price}€" />
    <meta property="og:description" content="${product.desc}" />
    <meta property="og:image" content="${product.image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content="${BASE_URL}/?product=${productId}" />
    <meta property="og:type" content="product" />
    <meta property="og:locale" content="fr_FR" />
    
    <!-- ===== TWITTER CARD ===== -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${product.name} · StyleShop Nordexx" />
    <meta name="twitter:description" content="${product.desc}" />
    <meta name="twitter:image" content="${product.image}" />
    
    <!-- ===== REDIRECTION VERS LA SPA ===== -->
    <meta http-equiv="refresh" content="0; url=/?product=${productId}" />
    
    <!-- ===== SCHEMA.ORG PRODUIT ===== -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "${product.name.replace(/"/g, '\\"')}",
        "description": "${product.desc.replace(/"/g, '\\"')}",
        "image": "${product.image}",
        "offers": {
            "@type": "Offer",
            "price": "${product.price}",
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
<body style="font-family: 'Segoe UI', Roboto, sans-serif; text-align: center; padding: 50px; background: #f8f6f2; margin: 0;">
    <div style="max-width: 500px; margin: 0 auto; background: white; padding: 30px; border-radius: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
        <img src="${product.image}" alt="${product.name}" style="width: 100%; max-width: 300px; border-radius: 10px; margin-bottom: 20px;">
        <h1 style="font-size: 24px; color: #1e1e1e; margin: 10px 0;">${product.name}</h1>
        <p style="font-size: 28px; color: #c0392b; font-weight: bold; margin: 10px 0;">${product.price} €</p>
        <p style="color: #5e5546; margin: 10px 0;">${product.desc}</p>
        <p style="margin-top: 20px; font-size: 14px; color: #999;">⏳ Redirection vers le produit...</p>
        <a href="/?product=${productId}" style="display: inline-block; margin-top: 15px; padding: 12px 30px; background: #1e1e1e; color: white; border-radius: 30px; text-decoration: none; font-weight: 600;">Voir le produit →</a>
    </div>
</body>
</html>`;
}

// ============================================================
//  MAIN HANDLER
// ============================================================
module.exports = (req, res) => {
    const { product, blog, about } = req.query;
    
    // Cas du Blog
    if (blog) {
        const html = generateBlogOG();
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Cache-Control', 'public, max-age=3600');
        return res.send(html);
    }
    
    // Cas de la page À propos
    if (about) {
        const html = generateAboutOG();
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Cache-Control', 'public, max-age=3600');
        return res.send(html);
    }
    
    // Cas du produit
    const p = products[product] || null;
    
    if (!p) {
        // Redirection vers l'accueil si produit invalide
        const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0; url=/">
    <title>StyleShop Nordexx</title>
</head>
<body>
    <p>Redirection vers StyleShop...</p>
</body>
</html>`;
        res.setHeader('Content-Type', 'text/html');
        return res.send(html);
    }
    
    // Générer la page produit
    const html = generateProductOG(product, p);
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(html);
};
