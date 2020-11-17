var deferredPrompt;

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(() => {
        console.log('Service worker registered.');
    });
}

window.addEventListener('beforeinstallprompt', (e) => {
    console.info('beforeinstallprompt Fired');
    e.preventDefault();
    deferredPrompt = e;
    return false;
});