import{getUrlParameter}from"./utils/urlUtils.js";const nav=function(){const t="is-hidden";let e=[],n=function(){const t=getUrlParameter("slide");return null!==t?parseInt(t)-1:0}();function s(t){const e=t.target.closest(".js-nav-button");if(e){switch(e.dataset.direction){case"back":a();break;case"next":i();break;case"home":o(0)}}}function c(t){switch(t.keyCode){case 37:a();break;case 39:i()}}function a(){o(n-1)}function i(){o(n+1)}function o(s){var c;s<0||s>e.length-1||(c=n=s,history.pushState(c,"",`?slide=${c+1}`),e.forEach((e,s)=>{const c=e.classList;s===n?c.remove(t):c.add(t)}))}return document.addEventListener("click",s),document.addEventListener("keydown",c),{init:function(t){e=t,o(n)}}};export default nav;