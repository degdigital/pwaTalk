import {replaceContent} from './utils/domUtils.js';
import loader from './loader.js';
import nav from './nav.js';
import checkbox from './checkbox.js';

const slidesContainerEl = document.querySelector('.js-slides-container');
const loaderInst = loader();
const navInst = nav();
const slideClass = 'js-slide';
const slideCenteredClass = 'slide--centered';
const slideFullBleedClass = 'slide--full-bleed';
const sectionTitleClass = 'slide--section-title';
const hiddenClass = 'is-hidden';
const subscribeUrl = 'https://us-central1-pwatalk.cloudfunctions.net/subscribeTokenToTopic';
const topic = 'pwaDemo';
const messaging = firebase.messaging();
let slideEls;

function init() {
	const slideData = localStorage.slideData;
	if (slideData) {
		renderSlides(JSON.parse(slideData));
	} else {
		getSlideData(false);
	}
	initServiceWorkers();
}

function initServiceWorkers() {
	if ('serviceWorker' in navigator) {
    	navigator.serviceWorker.register('./service-worker.js')
    		// .then(() => navigator.serviceWorker.register('./firebase-messaging-sw.js'))
    		.then(() => {
    			// messaging.useServiceWorker(registration);
    			initMessaging();
    		});
  	}
}

function initMessaging() {
	messaging.requestPermission()
		.then(() => messaging.getToken())
		.then(token => sendTokenToServer(token))
		.catch(err => console.log('Unable to get permission to notify.', err));

	messaging.onMessage(function(payload) {
		// alert(payload.notification.body);
		alert(payload.notification.body);
	});

	messaging.onTokenRefresh(function() {
		messaging.getToken()
			.then(token => sendTokenToServer(token))
  			.catch(err => console.log('Unable to retrieve refreshed token ', err));
  	});
}

function sendTokenToServer(token) {
	fetch(`${subscribeUrl}?topic=${topic}&token=${token}`);
}

function getSlideData(showLoader = true) {
	if (showLoader) {
		loaderInst.show();
	}
	fetch('slides.json')
		.then(response => response.json()
		.then(slides => {
			renderSlides(slides);
			saveSlideData(slides);
		}))
		.catch(error => console.log(error));
		
}

function saveSlideData(slideData) {
    localStorage.slideData = JSON.stringify(slideData);
}

function renderSlides(slideData) {
	replaceContent(slidesContainerEl, slideData.reduce((output, slide, index) => {
		const style = slide.backgroundImage ? `background-image: url('${slide.backgroundImage}');` : '';
		const cssClasses = ['slide', `slide--${index}`, slideClass, hiddenClass];
		if(slide.isCentered) {
			cssClasses.push(slideCenteredClass);
		}
		if (slide.isFullBleed) {
			cssClasses.push(slideFullBleedClass);
		}
		if (slide.isSectionTitle) {
			cssClasses.push(sectionTitleClass);
		}
		return `
			${output}
			<section class="${cssClasses.join(' ')}" style="${style}">
				<div class="slide__contents-wrapper">
					${slide.heading ? `<h1 class="slide__heading ${slide.isTitle ? 'slide__heading--title' : ''}">${slide.heading}</h1>` : ''}
					${slide.subHeading ? `<h2 class="slide__subheading"${slide.subHeadingIsEditable === true ? ' contenteditable="true"' : ''}>${slide.subHeading}</h2>` : ''}
					${slide.content ? `<div class="slide__content">${slide.content}</div>` : ''}
				</div>
			</section>
		`
	}, ''));
	slideEls = Array.from(slidesContainerEl.querySelectorAll(`.${slideClass}`));
	navInst.init(slideEls);
	loaderInst.hide();
}

init();