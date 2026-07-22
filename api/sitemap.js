// api/sitemap.js
export default function handler(req, res) {
    const baseUrl = 'https://nordexx-chi.vercel.app';
    const products = [
        { id: 1, name: 'T-shirt Summer' },
        { id: 2, name: 'Tshirt Blanc Coton' },
        { id: 3, name: 'Montre connectée' },
        { id: 4, name: 'Pull Bleu Turquoise' },
        { id: 5, name: 'Hoodie Premium' },
        { id: 6, name: 'Pull Marrant' },
        { id: 7, name: 'Casquette Outdoor' },
        { id: 8, name: 'T-Shirt Logo' },
        { id: 9, name: 'Pull Hiver' }
    ];

    const today = new Date().toISOString().split('T')[0];
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

    products.forEach(p => {
        sitemap += `
  <url>
    <loc>${baseUrl}/?product=${p.id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
    });

    sitemap += `
  <url>
    <loc>${baseUrl}/#apropos</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/#blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;

    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(sitemap);
}
