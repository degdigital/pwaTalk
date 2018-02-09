const loader = function() {

	const loaderElCls = document.querySelector('.js-loader').classList;
	const hiddenClass = 'is-hidden';

	function hide() {
		loaderElCls.add(hiddenClass);
	}

	function show() {
		loaderElCls.remove(hiddenClass);
	}

	return {
		hide,
		show
	};

};

export default loader;