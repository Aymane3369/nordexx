{
  "rewrites": [
    {
      "source": "/product/:id",
      "destination": "/api/og?product=:id"
    },
    {
      "source": "/blog",
      "destination": "/api/og?blog=true"
    },
    {
      "source": "/about",
      "destination": "/api/og?about=true"
    },
    {
      "source": "/api/create-checkout-session",
      "destination": "/api/create-checkout-session"
    },
    {
      "source": "/api/og",
      "destination": "/api/og"
    },
    {
      "source": "/api/webhook",
      "destination": "/api/webhook"
    },
    {
      "source": "/api/sitemap",
      "destination": "/api/sitemap"
    },
    {
      "source": "/sitemap.xml",
      "destination": "/api/sitemap"
    },
    {
      "source": "/robots.txt",
      "destination": "/robots.txt"
    },
    {
      "source": "/success",
      "destination": "/success.html"
    },
    {
      "source": "/cancel",
      "destination": "/cancel.html"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/api/og",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=3600" },
        { "key": "Access-Control-Allow-Origin", "value": "*" }
      ]
    },
    {
      "source": "/api/sitemap",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=3600" },
        { "key": "Content-Type", "value": "application/xml; charset=utf-8" }
      ]
    },
    {
      "source": "/sitemap.xml",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=3600" },
        { "key": "Content-Type", "value": "application/xml; charset=utf-8" }
      ]
    },
    {
      "source": "/robots.txt",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=3600" },
        { "key": "Content-Type", "value": "text/plain; charset=utf-8" }
      ]
    },
    {
      "source": "/api/create-checkout-session",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Methods", "value": "POST, OPTIONS" }
      ]
    },
    {
      "source": "/api/webhook",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" }
      ]
    },
    {
      "source": "/success.html",
      "headers": [
        { "key": "Cache-Control", "value": "no-cache, no-store, must-revalidate" }
      ]
    },
    {
      "source": "/cancel.html",
      "headers": [
        { "key": "Cache-Control", "value": "no-cache, no-store, must-revalidate" }
      ]
    },
    {
      "source": "/(.*).(css|js|mjs)",
      "headers": [
        { "key": "Content-Type", "value": "application/javascript; charset=utf-8" }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "geolocation=(), microphone=(), camera=()" }
      ]
    }
  ]
}
