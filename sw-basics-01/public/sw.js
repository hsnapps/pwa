self.addEventListener('install', (e) => {
    console.log('[ServiceWorker] Installing serviceWorker ...');
});

self.addEventListener('activate', (e) => {
    console.log('[ServiceWorker] Activating serviceWorker ...');
    return self.clients.claim();
});

// self.addEventListener('fetch', (e) => {
//     console.log('[ServiceWorker] Fetching content ...', e);
//     e.respondWith(fetch(e.request));
// });

//