// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
    const url = new URL(request.url);
    const productId = url.searchParams.get('product');
    const page = url.searchParams.get('page');
    const userAgent = request.headers.get('user-agent') || '';
    
    // Détecter les robots sociaux
    const isBot = /facebook|twitter|whatsapp|linkedin|pinterest|slack|telegram|discord|bot|crawler|spider/i.test(userAgent);
    
    if (isBot && (productId || page === 'blog' || page === 'about')) {
        // Rediriger vers l'API OG
        const ogUrl = new URL('/api/og', request.url);
        ogUrl.search = url.search;
        return NextResponse.rewrite(ogUrl);
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: '/:path*',
};
