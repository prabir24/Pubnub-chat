const staticCacheName = 'static-pages-v1';
const dynamicCacheName = 'dynamic-pages-v1';
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/app_sw.js',
    '/js/materialize.min.js',
    '/css/styles.css',
    '/css/materialize.min.css',
    '/bootstrap/css/bootstrap-theme.css',
    '/bootstrap/css/bootstrap-theme.css.map',
    '/bootstrap/css/bootstrap-theme.min.css',
    '/bootstrap/css/bootstrap.css',
    '/bootstrap/css/bootstrap.css.map',
    '/bootstrap/css/bootstrap.min.css',
    '/bootstrap/fonts/glyphicons-halflings-regular.eot',
    '/bootstrap/fonts/glyphicons-halflings-regular.svg',
    '/bootstrap/fonts/glyphicons-halflings-regular.ttf',
    '/bootstrap/fonts/glyphicons-halflings-regular.woff',
    '/bootstrap/fonts/glyphicons-halflings-regular.woff2',
    '/bootstrap/js/bootstrap.js',
    '/bootstrap/js/bootstrap.min.js',
    '/bootstrap/js/npm.js',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v50/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
    '/pages/fallback.html'
];

const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if(keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        })
    })
};

self.addEventListener('install', evt => {
    //console.log('service worker has been installed');
    evt.waitUntil(
        caches.open(staticCacheName)
            .then(cache => {
                console.log('caching shell assets');
                cache.addAll(assets);
            })
    );
});

self.addEventListener('activate', evt => {
    //console.log('service worker has been activated');
    evt.waitUntil(
        caches.keys().then(keys =>{
            //console.log(keys);
            return Promise.all(keys
                .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key))
                )
        })
    );
});

self.addEventListener('fetch', evt => {
    //console.log('Fetch Event', evt);
    evt.respondWith(
        caches.match(evt.request)
        .then(cacheRes => {
            return cacheRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    limitCacheSize(dynamicCacheName, 15);
                    return fetchRes;
                })
            });
        }).catch(() => {
            if(evt.request.url.indexOf('.html') > -1) {
                caches.match('/pages/fallback.html')
            }
        })
    );
});