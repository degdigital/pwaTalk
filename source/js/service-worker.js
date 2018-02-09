var cacheName = 'pwaTalk-v1';
var filesToCache = [
	'/',
	'/index.html',
	'/css/main.css',
	'/js/app.js',
	'/js/loader.js',
	'/js/nav.js',
	'/js/pushMessaging.js',
	'/js/utils/domUtils.js',
	'/js/utils/urlUtils.js',
	'/images/arrow.svg',
	'/images/home.svg',
	'/images/logo.svg',
	'/images/icons/favicon-16x16.png',
	'/images/icons/favicon-32x32.png',
	'/images/icons/favicon-96x96.png',
	'/images/icons/favicon.ico'
];

self.addEventListener('install', function(e) {
	console.log('[ServiceWorker] Install');
	e.waitUntil(
		caches.open(cacheName).then(function(cache) {
			console.log('[ServiceWorker] Caching app shell');
			return cache.addAll(filesToCache);
		})
	);
});

self.addEventListener('activate', function(e) {
	console.log('[ServiceWorker] Activate');
	e.waitUntil(
		caches.keys().then(function(keyList) {
			return Promise.all(keyList.map(function(key) {
				if (key !== cacheName) {
					// console.log('[ServiceWorker] Removing old cache', key);
					return caches.delete(key);
				}
			}));
		})
	);
	return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
	console.log(e.request.url);
	if (e.request.url.indexOf('slides.json') === -1) {
		e.respondWith(
			caches.match(e.request).then(function(response) {
				return response || fetch(e.request);
			})
		);
	}
});
