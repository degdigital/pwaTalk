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