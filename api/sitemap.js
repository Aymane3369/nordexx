// api/sitemap.js
// Génère un vrai sitemap.xml avec les URLs canoniques (/produit/:slug-:id)

const BASE_URL = 'https://nordexx-chi.vercel.app';

// ============================================================
// DONNÉES PRODUITS (identique au frontend et à api/og.js)
// ============================================================
const products = [
    { 
        id: 1, 
        name: "T-shirt d'été", 
        images: ["https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000136560_eixfr7"] 
    },
    { 
        id: 2, 
        name: "T-shirt blanc coton bio", 
        images: ["https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000143347_ttqayv"] 
    },
    { 
        id: 3, 
        name: "Montre connectée Pro", 
        images: ["https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000143357_mfpyic", "https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000143359_ves0lm"] 
    },
    { 
        id: 4, 
        name: "Pull Bleu Turquoise", 
        images: ["https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000142364_btulbg"] 
    },
    { 
        id: 5, 
        name: "Hoodie Premium", 
        images: ["https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000142320_spxhgb", "https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000142324_mukozl", "https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000142314_qvr0pr"] 
    },
    { 
        id: 6, 
        name: "Pull Marrant", 
        images: ["https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000142350_imvwly", "https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000142346_mi9q4w"] 
    },
    { 
        id: 7, 
        name: "Casquette Outdoor", 
        images: ["https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000143372_spatwa", "https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000143375_jn8a3h"] 
    },
    { 
        id: 8, 
        name: "T-shirt Logo", 
        images: ["https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000142507_qczqag"] 
    },
    { 
        id: 9, 
        name: "Pull Hiver", 
        images: ["https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000142368_c8rtpd"] 
    }
];

function getProductSlug(product) {
    if (!product) return '';
    return product.name.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function buildSitemap() {
    const today = new Date().toISOString().split('T')[0];
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

    // Pages statiques
    const staticUrls = [
        { loc: `${BASE_URL}/`, changefreq: 'daily', priority: '1.0' },
        { loc: `${BASE_URL}/blog`, changefreq: 'weekly', priority: '0.7' },
        { loc: `${BASE_URL}/a-propos`, changefreq: 'monthly', priority: '0.8' },
        { loc: `${BASE_URL}/mentions-legales`, changefreq: 'yearly', priority: '0.4' },
        { loc: `${BASE_URL}/cgv`, changefreq: 'yearly', priority: '0.4' },
        { loc: `${BASE_URL}/confidentialite`, changefreq: 'yearly', priority: '0.4' }
    ];
    staticUrls.forEach(u => {
        xml += `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>\n`;
    });

    // Catégories
    ['vetements', 'accessoires', 'nouveautes'].forEach(cat => {
        xml += `  <url>\n    <loc>${BASE_URL}/categorie/${cat}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });

    // Pages produits (avec URLs canoniques)
    products.forEach(p => {
        const slug = getProductSlug(p);
        const loc = `${BASE_URL}/produit/${slug}-${p.id}`;
        xml += `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n`;
        p.images.forEach(img => {
            xml += `    <image:image><image:loc>${img}</image:loc></image:image>\n`;
        });
        xml += `  </url>\n`;
    });

    xml += `</urlset>`;
    return xml;
}

module.exports = (req, res) => {
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.status(200).send(buildSitemap());
};
