const jsonVars = new URL(location).searchParams.get('vars');
const APP_CONFIG = JSON.parse(jsonVars);

// const CACHE_NAME = APP_CONFIG.CACHE;

const CACHE_NAME = 'static';

self.addEventListener('install', function (event) {
    console.log('SW Installed');
    event.waitUntil(
        caches.open(CACHE_NAME) /* SW install code from here */
        .then(function (cache) {
        // cache.add('/');
        // cache.add('/index.html');
        // cache.add('/src/js/app.js');
            cache.addAll([
                '/'
            ]);
            console.log('caching in install..');
        })
    );
});

self.addEventListener('activate', function (e) {
    console.log('SW Activated');
    e.waitUntil(
        caches.keys()
        .then(function (cacheList) {
            Promise.all(
                cacheList.map(function (key) {
                    if (key === CACHE_NAME) { 
                        return;         /* clear out the old cache we don't need anymore */
                    }
                    caches.delete(key);
                })
            )
        })
    );
});

self.addEventListener('fetch', function(event) {

    if (!(event.request.url.indexOf('http') === 0)) return; // skip the request. if request is not made with http protocol

    console.log(`SW fetch from ${event.request.url}`);

    event.respondWith(
        fromCache(event.request)
    );

    event.waitUntil(
        update(event.request)
        .then(refresh)
    );
});


/* Functions */

function fromCache(request) {
    return  caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.match(request, null);
            })
        ;
}

function update(request) {
    return caches.open(CACHE_NAME)
    .then(
        function (cache) {
            return fetch(request)
                    .then(
                        function (response) {
                            // console.log(cache);
                            return cache.put(
                                request, 
                                response.clone()
                            )
                            .then(function () {
                                return response;
                            });
                        }
                    );
        }
    );
}

function refresh(response) {
    return self.clients.matchAll()
    .then(
        function (clients) {
            clients.forEach(function (client) {
                var message = {
                    type: 'refresh',
                    url: response.url,
                    eTag: response.headers.get('ETag')
                };
                client.postMessage(JSON.stringify(message));
            });
        }
    );
}