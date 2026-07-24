// api/product/[id].js
export default function handler(req, res) {
  const { id } = req.query;
  // Simuler la récupération du produit (à adapter avec votre vrai tableau)
  const products = [
    { id: 1, name: "T-shirt d'été", price: 25.96, desc: "T-shirt estival en coton doux", image: "https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto/1000136560_eixfr7" },
    // ... tous vos produits
  ];
  const product = products.find(p => p.id == id);
  if (!product) return res.status(404).send('Produit non trouvé');

  const ogImage = `https://res.cloudinary.com/nrv87gxz/image/upload/f_auto,q_auto,w_1200,h_630,c_fill,l_text:Arial_64:${encodeURIComponent(product.name)},co_rgb:FFFFFF,c_fit,w_800,h_200/${product.image.split('/').pop()}`;

  res.setHeader('Content-Type', 'text/html');
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta property="og:title" content="${product.name}" />
      <meta property="og:description" content="${product.desc}" />
      <meta property="og:image" content="${ogImage}" />
      <meta property="og:url" content="https://nordexx-chi.vercel.app/produit/${product.name.toLowerCase().replace(/ /g,'-')}-${product.id}" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="${product.name}" />
      <meta name="twitter:description" content="${product.desc}" />
      <meta name="twitter:image" content="${ogImage}" />
      <meta http-equiv="refresh" content="0; url=https://nordexx-chi.vercel.app/produit/${product.name.toLowerCase().replace(/ /g,'-')}-${product.id}" />
    </head>
    <body>
      <p>Redirection vers le produit...</p>
    </body>
    </html>
  `);
}
