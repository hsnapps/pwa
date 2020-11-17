if (!window.Promise) {
    window.Promise = Promise;
}

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

var promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve('This is executed once the timer is done!');
        reject({
            code: 500,
            message: 'Oh no.. an error occured!'
        });
    }, 3000);
});

fetch('http://httpbin.org/ip')
    .then(res => res.json())
    .then(data => console.info('IP : ' + data.origin))
    .catch(err => console.error(err));

fetch('http://httpbin.org/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ message: 'Does this work?' })
    }).then(res => res.json())
    .then(data => console.info(data.json.message))
    .catch(err => console.error(err));

promise.then(r => console.log(r)).catch(er => console.error("You've got an error", er));

console.log('This is executed right after setTimeout()');