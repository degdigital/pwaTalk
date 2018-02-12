import{replaceContent}from"./utils/domUtils.js";import loader from"./loader.js";import nav from"./nav.js";import checkbox from"./checkbox.js";const slidesContainerEl=document.querySelector(".js-slides-container"),loaderInst=loader(),navInst=nav(),slideClass="js-slide",slideCenteredClass="slide--centered",slideFullBleedClass="slide--full-bleed",sectionTitleClass="slide--section-title",hiddenClass="is-hidden",subscribeUrl="https://us-central1-pwatalk.cloudfunctions.net/subscribeTokenToTopic",topic="pwaDemo",messaging=firebase.messaging();let slideEls;function init(){const e=localStorage.slideData;e?renderSlides(JSON.parse(e)):getSlideData(!1),initServiceWorkers()}function initServiceWorkers(){"serviceWorker"in navigator&&navigator.serviceWorker.register("./js/service-worker.js").then(()=>navigator.serviceWorker.register("./js/firebase-messaging-sw.js")).then(e=>{messaging.useServiceWorker(e),initMessaging()})}function initMessaging(){messaging.requestPermission().then(()=>messaging.getToken()).then(e=>sendTokenToServer(e)).catch(e=>console.log("Unable to get permission to notify.",e)),messaging.onMessage(function(e){alert(e.notification.body)}),messaging.onTokenRefresh(function(){messaging.getToken().then(e=>sendTokenToServer(e)).catch(e=>console.log("Unable to retrieve refreshed token ",e))})}function sendTokenToServer(e){fetch(`${subscribeUrl}?topic=${topic}&token=${e}`)}function getSlideData(e=!0){e&&loaderInst.show(),fetch("slides.json").then(e=>e.json().then(e=>{renderSlides(e),saveSlideData(e)})).catch(e=>console.log(e))}function saveSlideData(e){localStorage.slideData=JSON.stringify(e)}function renderSlides(e){replaceContent(slidesContainerEl,e.reduce((e,s,t)=>{const n=s.backgroundImage?`background-image: url('${s.backgroundImage}');`:"",i=["slide",`slide--${t}`,slideClass,hiddenClass];return s.isCentered&&i.push(slideCenteredClass),s.isFullBleed&&i.push(slideFullBleedClass),s.isSectionTitle&&i.push(sectionTitleClass),`\n\t\t\t${e}\n\t\t\t<section class="${i.join(" ")}" style="${n}">\n\t\t\t\t<div class="slide__contents-wrapper">\n\t\t\t\t\t${s.heading?`<h1 class="slide__heading ${s.isTitle?"slide__heading--title":""}">${s.heading}</h1>`:""}\n\t\t\t\t\t${s.subHeading?`<h2 class="slide__subheading"${!0===s.subHeadingIsEditable?' contenteditable="true"':""}>${s.subHeading}</h2>`:""}\n\t\t\t\t\t${s.content?`<div class="slide__content">${s.content}</div>`:""}\n\t\t\t\t</div>\n\t\t\t</section>\n\t\t`},"")),slideEls=Array.from(slidesContainerEl.querySelectorAll(`.${slideClass}`)),navInst.init(slideEls),loaderInst.hide()}init();