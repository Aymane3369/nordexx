// api/sitemap.js
// Génère un sitemap.xml dynamique avec tous les produits, catégories et images

const products = [
    { 
        id: 1, 
        name: 'T-shirt Summer',
        image: 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000136560_eixfr7',
        price: '25.96'
    },
    { 
        id: 2, 
        name: 'Tshirt Blanc Coton',
        image: 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000143347_ttqayv',
        price: '21.90'
    },
    { 
        id: 3, 
        name: 'Montre connectée',
        image: 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000143357_mfpyic',
        price: '35.00'
    },
    { 
        id: 4, 
        name: 'Pull Bleu Turquoise',
        image: 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000142364_btulbg',
        price: '39.00'
    },
    { 
        id: 5, 
        name: 'Hoodie Premium',
        image: 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000142320_spxhgb',
        price: '49.90'
    },
    { 
        id: 6, 
        name: 'Pull Marrant',
        image: 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000142350_imvwly',
        price: '30.90'
    },
    { 
        id: 7, 
        name: 'Casquette Outdoor',
        image: 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000143372_spatwa',
        price: '14.90'
    },
    { 
        id: 8, 
        name: 'T-Shirt Logo',
        image: 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000142507_qczqag',
        price: '21.99'
    },
    { 
        id: 9, 
        name: 'Pull Hiver',
        image: 'https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000142368_c8rtpd',
        price: '35.00'
    }
];

const categories = ['vetements', 'accessoires', 'nouveautes'];

export default function handler(req, res) {
    const baseUrl = 'https://nordexx-chi.vercel.app';
    const today = new Date().toISOString().split('T')[0];
    
    // Début du sitemap avec namespace images
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
    
    <!-- ===== PAGE D'ACCUEIL ===== -->
    <url>
        <loc>${baseUrl}/</loc>
        <lastmod>${today}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    
    <!-- ===== CATÉGORIES ===== -->
    ${categories.map(cat => `
    <url>
        <loc>${baseUrl}/?category=${cat}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>`).join('')}
    
    <!-- ===== PRODUITS ===== -->
    ${products.map(p => `
    <url>
        <loc>${baseUrl}/?product=${p.id}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
        <image:image>
            <image:loc>${p.image}</image:loc>
            <image:title>${p.name} - StyleShop Nordexx</image:title>
            <image:caption>${p.name} à ${p.price}€ - StyleShop/Nordexx</image:caption>
            <image:license>https://nordexx-chi.vercel.app/</image:license>
        </image:image>
    </url>`).join('')}
    
    <!-- ===== PAGES STATIQUES ===== -->
    <url>
        <loc>${baseUrl}/blog</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
    </url>
    <url>
        <loc>${baseUrl}/about</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    
</urlset>`;

    // Envoyer la réponse
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.status(200).send(sitemap);
}
