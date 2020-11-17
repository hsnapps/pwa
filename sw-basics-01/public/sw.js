self.addEventListener('install', (e) => {
    console.log('[ServiceWorker] Installing serviceWorker ...', e);
});

self.addEventListener('activate', (e) => {
    console.log('[ServiceWorker] Activating serviceWorker ...', e);
    return self.clients.claim();
});