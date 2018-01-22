function emptyElement(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}

function replaceContent(el, newContent) {
    emptyElement(el);
    el.insertAdjacentHTML('afterbegin', newContent);
}

export {
	replaceContent
};