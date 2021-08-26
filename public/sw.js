const cacheName = 'static-x3fPWA-' + new Date().getTime(); ;

self.addEventListener('install', function (event) {
    console.log('SW Installed');
    event.waitUntil(
        caches.open(cacheName) /* SW install code from here */
        .then(function (cache) {
        // cache.add('/');
        // cache.add('/index.html');
        // cache.add('/src/js/app.js');
            cache.addAll([
                '/',                /* Caching contents */
                '/index.html',
                '/src/js/app.js',
                '/src/css/app.css',
                '/src/images/pwa.jpg',
                'https://fonts.googleapis.com/css?family=Raleway:400,700'
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
                    if (key === cacheName) { 
                        return;         /* clear out the old cache we don't need anymore */
                    }
                    caches.delete(key);
                })
            )
        })
    );
});

self.addEventListener('fetch', function(event) {
    console.log(`SW fetch from ${event.request.url}`);
    event.respondWith(
        caches.match(event.request)
        .then(function(res) {
            if (res) {
                /*
                console.log('-----CACHE-------');
                console.log(res);
                console.log('-----------------');
                */
                return res;
            } else {
                /*
                console.log('-----HTTP-------');
                console.log(event.request);
                console.log('-----------------');
                */
                return fetch(event.request);
            }
        })    
    );
});