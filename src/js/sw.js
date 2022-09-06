let coreAssets = ['/css/main.css', '/js/main.js', '/favicons/favicon.ico'];

// On install, cache core assets
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('app').then(function (cache) {
            for (let asset of coreAssets) {
                cache.add(new Request(asset));
            }
            return cache;
        })
    );
});

// Listen for request events
self.addEventListener('fetch', function (event) {
    let request = event.request;

    // https://stackoverflow.com/a/49719964
    if (
        event.request.cache === 'only-if-cached' &&
        event.request.mode !== 'same-origin'
    )
        return;

    // HTML files (network-first)
    if (request.headers.get('Accept').includes('text/html')) {
        event.respondWith(
            fetch(request)
                .then(function (response) {
                    let copy = response.clone();
                    event.waitUntil(
                        caches.open('app').then(function (cache) {
                            return cache.put(request, copy);
                        })
                    );
                    return response;
                })
                .catch(function (error) {
                    return caches.match(request).then(function (response) {
                        return response || caches.match('/offline.html');
                    });
                })
        );
    }

    // CSS & JavaScript (offline-first)
    if (
        request.headers.get('Accept').includes('text/css') ||
        request.headers.get('Accept').includes('text/javascript')
    ) {
        event.respondWith(
            caches.match(request).then(function (response) {
                return (
                    response ||
                    fetch(request).then(function (response) {
                        return response;
                    })
                );
            })
        );
        return;
    }

    // Images (offline-first)
    if (request.headers.get('Accept').includes('image')) {
        event.respondWith(
            caches.match(request).then(function (response) {
                return (
                    response ||
                    fetch(request).then(function (response) {
                        let copy = response.clone();
                        event.waitUntil(
                            caches.open('app').then(function (cache) {
                                return cache.put(request, copy);
                            })
                        );
                        return response;
                    })
                );
            })
        );
    }
});
