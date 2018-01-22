function getUrlParameter(name, queryString = window.location.search) {
	let match = RegExp('[?&]' + name + '=([^&]*)').exec(queryString);
	return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

export {
	getUrlParameter
};