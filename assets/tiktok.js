{
  const section = document.getElementById('tiktok');
  const feed = document.getElementById('tikTokFeed');
  const profile = document.getElementById('tikTokProfile');
  const toggle = document.getElementById('tikTokToggle');
  const label = toggle.querySelector('span');
  const privacy = document.getElementById('tikTokPrivacy');
  const status = document.getElementById('tikTokStatus');
  const template = document.getElementById('tikTokTemplate');
  const preference = 'nino-tiktok-videos';
  let enabled = false;
  let embed;
  let timeout;
  let frameObserver;

  try {
    enabled = localStorage.getItem(preference) === 'enabled';
  } catch {
    // The control also works when storage is unavailable.
  }

  function updateControl() {
    label.textContent = enabled ? 'Nascondi i video TikTok' : 'Mostra i video TikTok';
    toggle.setAttribute('aria-expanded', String(enabled));
    privacy.hidden = enabled;
    profile.hidden = true;
  }

  function finishLoading() {
    frameObserver?.disconnect();
    clearTimeout(timeout);
    feed.removeAttribute('data-loading');
    feed.removeAttribute('aria-busy');
  }

  function removeFeed() {
    finishLoading();
    feed.replaceChildren();
    embed = undefined;
  }

  function showFeed() {
    if (!enabled || embed) return;
    const script = document.createElement('script');
    embed = script;
    status.textContent = 'Caricamento dei video…';
    feed.setAttribute('data-loading', '');
    feed.setAttribute('aria-busy', 'true');

    const unavailable = () => {
      if (embed !== script) return;
      removeFeed();
      status.textContent = 'I video sono disponibili sul nostro profilo.';
      profile.hidden = false;
    };

    frameObserver = new MutationObserver(() => {
      const frame = feed.querySelector('iframe');
      if (!frame || frame.getBoundingClientRect().height < 240) return;
      frame.title = 'Video TikTok di Fiori e Piante di Nino';
      finishLoading();
      status.textContent = '';
    });
    frameObserver.observe(feed, { childList: true, subtree: true, attributes: true, attributeFilter: ['style'] });
    timeout = setTimeout(unavailable, 9000);
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    script.addEventListener('error', unavailable, { once: true });
    feed.append(template.content.cloneNode(true), script);
  }

  const proximity = 'IntersectionObserver' in window
    ? new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      proximity.disconnect();
      showFeed();
    }, { rootMargin: '260px 0px' })
    : null;

  toggle.hidden = false;
  updateControl();
  if (enabled && proximity) {
    proximity.observe(section);
  } else if (!proximity && enabled) {
    enabled = false;
    updateControl();
  }

  toggle.addEventListener('click', () => {
    enabled = !enabled;
    try {
      if (enabled) localStorage.setItem(preference, 'enabled');
      else localStorage.removeItem(preference);
    } catch {
      // The current page can still show or hide the videos.
    }
    proximity?.disconnect();
    updateControl();
    if (enabled) showFeed();
    else {
      removeFeed();
      status.textContent = '';
    }
  });
}
