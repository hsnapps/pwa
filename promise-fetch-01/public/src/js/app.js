var deferredPrompt;

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(function() {
            console.log('Service worker registered!');
        });
}

window.addEventListener('beforeinstallprompt', (e) => {
    console.log('beforeinstallprompt fired');
    e.preventDefault();
    deferredPrompt = e;
    return false;
});

setTimeout(() => {
    console.log('This is executed once the timer is done!');
}, 3000);

console.log('This is executed right after setTimeout()');