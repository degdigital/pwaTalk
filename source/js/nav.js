import {getUrlParameter} from './utils/urlUtils.js';

const nav = function() {

	const hiddenClass = 'is-hidden';
	let slides = [];
	let currentIndex = getIndexFromUrl();

	function bindEvents() {
		document.addEventListener('click', onDocClick);
		document.addEventListener('keydown', onKeyDown);
	}

	function init(newSlides) {
		slides = newSlides;
		goToSlide(currentIndex);
	}

	function onDocClick(e) {
		const el = e.target.closest('.js-nav-button');
		if (el) {
			const direction = el.dataset.direction;
			switch(direction) {
				case 'back':
					goToPreviousSlide();
					break;
				case 'next':
					goToNextSlide();
					break;
				case 'home':
					goToSlide(0);
					break;
			}		
		}
	}

	function onKeyDown(e) {
		switch(e.keyCode) {
			case 33:
			case 37:
				goToPreviousSlide();
				break;
			case 34:
			case 39:
				goToNextSlide();
				break;
		}
	}

	function goToPreviousSlide() {
		goToSlide(currentIndex-1);
	}

	function goToNextSlide() {
		goToSlide(currentIndex+1);
	}

	function goToSlide(index) {
		if(index < 0 || index > (slides.length-1)) {
			return;
		}

		currentIndex = index;
		setUrl(currentIndex);
		slides.forEach((slide, slideIndex) => {
			const cls = slide.classList;
			if (slideIndex === currentIndex) {
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