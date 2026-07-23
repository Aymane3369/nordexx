// api/sitemap.js
// Génère un vrai sitemap.xml servi par le serveur (celui référencé dans vercel.json
// à /sitemap.xml -> /api/sitemap n'existait pas avant : Google ne pouvait rien crawler).
// Garder cette liste synchronisée avec le tableau `products` de index.html et avec api/og.js.

const BASE_URL = 'https://nordexx-chi.vercel.app';

const products = [
    { id: 1, images: ['https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000136560_eixfr7'] },
    { id: 2, images: ['https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000143347_ttqayv'] },
    { id: 3, images: ['https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000143357_mfpyic'] },
    { id: 4, images: ['https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000142364_btulbg'] },
    { id: 5, images: ['https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000142320_spxhgb'] },
    { id: 6, images: ['https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000142350_imvwly'] },
    { id: 7, images: ['https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000143372_spatwa'] },
    { id: 8, images: ['https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000142507_qczqag'] },
    { id: 9, images: ['https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000142368_c8rtpd'] }
];

function buildSitemap() {
    const today = new Date().toISOString().split('T')[0];

    let urls = [
        { loc: `${BASE_URL}/`, changefreq: 'daily', priority: '1.0' },
        { loc: `${BASE_URL}/blog`, changefreq: 'weekly', priority: '0.7' },
        { loc: `${BASE_URL}/about`, changefreq: 'monthly', priority: '0.8' }
    ];

    ['vetements', 'accessoires', 'nouveautes'].forEach(cat => {
        urls.push({ loc: `${BASE_URL}/?category=${cat}`, changefreq: 'weekly', priority: '0.8' });
    });

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

    urls.forEach(u => {
        xml += `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>\n`;
    });

    products.forEach(p => {
        xml += `  <url>\n    <loc>${BASE_URL}/?product=${p.id}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n`;
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
