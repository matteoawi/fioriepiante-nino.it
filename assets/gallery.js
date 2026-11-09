const grid = document.getElementById('grid');
const loadMore = document.getElementById('loadMore');
const lightbox = document.getElementById('lb');
const lightboxImage = document.getElementById('lbImg');
const originalLink = document.getElementById('lbOpen');
const contactLink = document.getElementById('lbBtn');
const { prefix, label } = grid.dataset;
const total = Number(grid.dataset.total);
let visible = grid.childElementCount;
let previousOverflow = '';

function addPhoto(number) {
  const name = `${prefix}-${number}`;
  const link = document.createElement('a');
  link.className = 'tile';
  link.href = `./${name}.jpg`;

  const image = document.createElement('img');
  image.width = 360;
  image.height = 360;
  image.loading = 'lazy';
  image.decoding = 'async';
  image.alt = `${label} ${number}`;
  image.src = `./thumbs/${name}.webp`;
  link.append(image);
  grid.append(link);
}

loadMore.hidden = visible >= total;
loadMore.addEventListener('click', () => {
  const firstAdded = visible;
  const limit = Math.min(visible + 12, total);
  while (visible < limit) addPhoto(++visible);
  loadMore.hidden = visible >= total;
  grid.children[firstAdded]?.focus({ preventScroll: true });
});

grid.addEventListener('error', (event) => {
  const image = event.target;
  const original = image.closest('.tile')?.href;
  if (original && image.src !== original) image.src = original;
}, true);

grid.addEventListener('click', (event) => {
  const tile = event.target.closest('.tile');
  if (!tile || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !lightbox.showModal) return;
  event.preventDefault();

  const original = tile.href;
  const message = `Ciao Nino! 👋\n\nSarei interessato a qualcosa di simile a questa foto che ho visto sul sito:\n${original}\n\nMi fai sapere? Grazie!`;
  lightboxImage.src = original;
  lightboxImage.alt = tile.querySelector('img').alt;
  originalLink.href = original;
  contactLink.href = `https://wa.me/393394324010?text=${encodeURIComponent(message)}`;

  previousOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  lightbox.showModal();
});

document.getElementById('lbClose').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});
lightbox.addEventListener('close', () => {
  document.body.style.overflow = previousOverflow;
  lightboxImage.removeAttribute('src');
});
