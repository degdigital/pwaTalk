const pushMessaging = function() {

	const messaging = firebase.messaging();

	messaging.requestPermission()
		.then(function() {
			console.log('Notification permission granted.');
			// TODO(developer): Retrieve an Instance ID token for use with FCM.
			// ...
		})
		.catch(function(err) {
			console.log('Unable to get permission to notify.', err);
		});

	messaging.onMessage(function(payload) {
		console.log("Message received. ", payload);
	});

};

export default pushMessaging;