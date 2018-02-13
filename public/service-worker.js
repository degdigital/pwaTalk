importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

var config = {
    apiKey: "AIzaSyDcY7PQYjYRHC5pJjjWoYbzcLJX1usk7x4",
    authDomain: "pwatalk.firebaseapp.com",
    databaseURL: "https://pwatalk.firebaseio.com",
    projectId: "pwatalk",
    storageBucket: "pwatalk.appspot.com",
    messagingSenderId: "538992840354"
};
firebase.initializeApp(config);
var messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
	console.log('[firebase-messaging-sw.js] Received background message ', payload);
	const title = payload.notification.title;
	const options = {
		body: payload.notification.body,
		icon: '/images/icons/icon-256x256.png'
	};
	return self.registration.showNotification(title, options);
});

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
	'/images/checkmark.svg',
	'/images/logo.svg',
	'/images/slides/discoverable.jpg',
	'/images/slides/emmet.jpg',
	'/images/slides/evergreen.jpg',
	'/images/slides/feels-like-an-app.jpg',
	'/images/slides/fruit-ninja.jpg',
	'/images/slides/installable.jpg',
	'/images/slides/iphone-safari.jpg',
	'/images/slides/linkable.jpg',
	'/images/slides/offline.jpg',
	'/images/slides/progressive-enhancement.jpg',
	'/images/slides/re-engageable.jpg',
	'/images/slides/responsive.jpg',
	'/images/slides/ssl.jpg',
	'/images/slides/steve-jobs-small.jpg',
	'/images/slides/steve-jobs.jpg',
	'/images/slides/title-bg.jpg',
	'/images/icons/favicon-16x16.png',
	'/images/icons/favicon-32x32.png',
	'/images/icons/favicon-96x96.png',
	'/images/icons/favicon.ico',
	'/videos/pwaforthat.mp4'
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
