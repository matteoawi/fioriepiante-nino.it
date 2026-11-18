const card = document.querySelector('fiori-tiktok');

if (card && 'IntersectionObserver' in window) {
  const proximity = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    proximity.disconnect();

    const feed = card.querySelector('.fiori-tiktok__feed');
    const status = card.querySelector('.fiori-tiktok__status');
    const embed = document.createElement('script');
    card.dataset.embedState = 'loading';
    feed.setAttribute('aria-busy', 'true');
    status.textContent = 'Caricamento dei video…';

    function finish() {
      clearTimeout(timeout);
      frameObserver.disconnect();
      feed.removeAttribute('aria-busy');
      embed.removeEventListener('error', unavailable);
    }

    function unavailable() {
      finish();
      feed.replaceChildren();
      card.dataset.embedState = 'unavailable';
      status.textContent = 'Puoi guardare i video sul profilo TikTok.';
    }

    const frameObserver = new MutationObserver(() => {
      const frame = feed.querySelector('iframe');
      if (!frame) return;
      frame.title = 'Profilo e video TikTok di Fiori e Piante di Nino';
      if (frame.getBoundingClientRect().height < 240) return;
      finish();
      card.dataset.embedState = 'ready';
      status.textContent = '';
    });
    frameObserver.observe(feed, {childList: true, subtree: true, attributes: true, attributeFilter: ['style']});

    const timeout = setTimeout(unavailable, 9000);
    embed.src = 'https://www.tiktok.com/embed.js';
    embed.async = true;
    embed.addEventListener('error', unavailable, {once: true});
    feed.append(card.querySelector('template').content.cloneNode(true), embed);
  }, {threshold: 0.1});

  proximity.observe(card);
}
