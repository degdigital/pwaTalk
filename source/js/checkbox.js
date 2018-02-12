const checkbox = function() {

	document.addEventListener('keyup', e => {
		const el = e.target.closest('.js-checkbox');
		if (el && el.hasAttribute('contenteditable')) {
			el.innerHTML = el.innerHTML === 'x' ? `<i class="icon--checkmark"></i>` : '';
		}
	});
	
}

const instance = checkbox();

export default instance;