window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'AW-11013620028');

let adsLoaded = false;

function loadAds() {
  if (adsLoaded) return;
  adsLoaded = true;
  const script = document.createElement('script');
  script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-11013620028';
  script.async = true;
  document.head.append(script);
}

// Registra subito gli ingressi pubblicitari e carica il tag sui clic di contatto.
const landingParams = new URLSearchParams(location.search);
if (['gclid', 'gclsrc', 'gbraid', 'wbraid', 'dclid', '_gl'].some(key => landingParams.has(key))) {
  loadAds();
}

function gtagSendEvent(url, openedWindow) {
  loadAds();
  var callbackCalled = false;
  var callback = function () {
    if (callbackCalled) return;
    callbackCalled = true;
    if (typeof url === 'string') {
      if (openedWindow && !openedWindow.closed) {
        openedWindow.location = url;
      } else {
        window.location = url;
      }
    }
  };
  setTimeout(callback, 2100);
  gtag('event', 'ads_conversion_Richiesta_preventivo_1', {
    'event_callback': callback,
    'event_timeout': 2000
  });
  return false;
}

document.addEventListener('click', function(event) {
  var link = event.target.closest && event.target.closest('a[href^="https://wa.me/"], a[href^="tel:"]');
  if (!link || !link.href) return;

  event.preventDefault();
  var openedWindow = link.target === '_blank' ? window.open('', '_blank') : null;
  if (openedWindow) openedWindow.opener = null;
  gtagSendEvent(link.href, openedWindow);
});
