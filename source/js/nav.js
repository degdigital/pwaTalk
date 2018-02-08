import {getUrlParameter} from './utils/urlUtils.js';

const nav = function() {

	const hiddenClass = 'is-hidden';
	let slides = [];
	let currentIndex = getIndexFromUrl();

	function bindEvents() {
		document.addEventListener('click', onDocClick);
	}

	function init(newSlides) {
		slides = newSlides;
		advanceSlides(currentIndex);
		setUrl(currentIndex);
	}

	function onDocClick(e) {
		const el = e.target;
		if (el.classList.contains('js-nav-button')) {
			const direction = el.dataset.direction;
			if (direction === 'back') {
				currentIndex = currentIndex === 0 ? 0 : currentIndex - 1;
			} else if (direction === 'next') {
				currentIndex = currentIndex + 1 > slides.length - 1 ? currentIndex : currentIndex + 1;
			} else if (direction === 'home') {
				currentIndex = 0;
			}
			advanceSlides(currentIndex);
			setUrl(currentIndex);
		}
	}

	function advanceSlides(newIndex) {
		slides.forEach((slide, index) => {
			const cls = slide.classList;
			if (index === currentIndex) {
				cls.remove(hiddenClass);
			} else {
				cls.add(hiddenClass);
			}
		});
	}

	function getIndexFromUrl() {
		const urlIndex = getUrlParameter('slide');
		return urlIndex !== null ? parseInt(urlIndex) - 1 : 0;
	}

	function setUrl(newIndex) {
		history.pushState(newIndex, '', `?slide=${newIndex + 1}`);
	}

	bindEvents();

	return {
		init
	};

};

export default nav;