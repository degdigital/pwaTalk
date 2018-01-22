'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fetch = require('node-fetch');
const firebase = admin.initializeApp(functions.config().firebase);

exports.subscribeTokenToTopic = functions.https.onRequest((req, res) => {

	const topic = req.query.topic;
	const token = req.query.token;

	admin.messaging().subscribeToTopic(token, topic)
		.then(function(response) {
			// console.log("Successfully subscribed to topic:", response);
		})
		.catch(function(error) {
			console.log("Error subscribing to topic:", error);
		});
});

exports.sendMessage = functions.https.onRequest((req, res) => {

	// https://us-central1-pwatalk.cloudfunctions.net/sendMessage?body=This%20is%20a%20test

	const topic = 'pwaDemo';
	const messageBody = req.query.body.length > 0 ? req.query.body : 'Test Message';
	const payload = {
		notification: {
			body: messageBody,
		}
	};
	admin.messaging().sendToTopic(topic, payload)
		.then(function(response) {
			res.status(200).send(`
				<!doctype html>
				<html>
					<head>
						<title>Send Message</title>
				    </head>
				    <body>
				    	Send Success
				    </body>
			    </html>`
			);
		})
		.catch(function(error) {
			console.log('Error sending message:', error);
		});
});