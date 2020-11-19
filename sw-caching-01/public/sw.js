const STATIC_CACHE = 'static-v3';
const DYNAMIC_CACHE = 'dynamic';

self.addEventListener('install', event => {
    console.log('[Service Worker] Installing Service Worker ...');
    event.waitUntil(
        caches.open(STATIC_CACHE).then(cache => {
            console.log('[Service Worker] Pre-caching App Shell ...');
            cache.addAll([
                // Contents
                '/',
                '/index.html',

                // Scripts
                '/src/js/app.js',
                '/src/js/feed.js',
                '/src/js/material.min.js',

                // Styles
                '/src/css/app.css',
                '/src/css/feed.css',

                // Images
                '/src/images/main-image.jpg',

                // Icons
                '/src/images/icons/apple-icon-57x57.png',
                '/src/images/icons/apple-icon-60x60.png',
                '/src/images/icons/apple-icon-72x72.png',
                '/src/images/icons/apple-icon-76x76.png',
                '/src/images/icons/apple-icon-114x114.png',
                '/src/images/icons/apple-icon-120x120.png',
                '/src/images/icons/apple-icon-144x144.png',
                '/src/images/icons/apple-icon-152x152.png',
                '/src/images/icons/apple-icon-180x180.png',
                '/src/images/icons/app-icon-144x144.png',
                '/favicon.ico',

                // CDN
                'https://fonts.googleapis.com/css?family=Roboto:400,700',
                'https://fonts.googleapis.com/icon?family=Material+Icons',
                'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
            ]);
        })
    );
});

self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activating Service Worker ....');
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE) {
                    console.log('[Service Worker] Removing old cache.');
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
    // console.log('[Service Worker] Fetching something ....', event);
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response;
            } else {
                return fetch(event.request).then(res => {
                    return caches.open(DYNAMIC_CACHE).then(cache => {
                        cache.put(event.request.url, res.clone());
                        return res;
                    })
                }).catch(err => {});
            }
        })
    );
});