import defaultEl from './gallery-items.js';
const ulRef = document.querySelector('.js-gallery');
const divEl = document.querySelector('.js-lightbox');
const btnEl = document.querySelector('button[data-action ="close-lightbox"]');
const divModalEl = document.querySelector('.lightbox__content');
const overEl = document.querySelector('.lightbox__overlay');
const newStringEl = defaultEl.reduce((acc, { preview, description, original }) => {
  return (acc += `<li class="gallery__item">
  <a class="gallery__link" href="${original}" >
  <img loading="lazy" class="gallery__image"
  src="${preview}"
  data-source="${original}"
  alt="${description}"/>
  </a>
  </li>`);
}, '');
ulRef.innerHTML = newStringEl;

const imgEl = document.querySelector('.gallery__image');

ulRef.addEventListener('click', e);     

    

const lightboxImage = document.querySelector('.lightbox__image');

function e(eve) {
  if(!eve.target.classList.contains('gallery__image')) {
    return;
  }
  eve.preventDefault();
// window.addEventListener('keydown', onEscKeyPress);
// window.addEventListener('keydown', onArrowKeyPress);
divEl.classList.add('is-open');
getImageAttr(eve.target.dataset.source, eve.target.alt); 
console.log(eve.target.dataset.source, eve.target.alt);   
  }

function getImageAttr (src, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt;
 }


// btnEl.addEventListener('click', () => {
//   divEl.classList.remove('is-open');
// });

// Очистка пути после закрытия модалки//

function isOpen() {
  // const divCloseModal = document.querySelector('.lightbox__image');
  divEl.classList.remove('is-open');
  getImageAttr('', '');
}
const closeModalEl = document.querySelector('[data-action="close-lightbox"]');
closeModalEl.addEventListener('click', isOpen);

overEl.addEventListener('click', isOpen);

// Управление кнопками //

document.addEventListener('keydown', eve => {
  const divCloseModal = document.querySelector('.lightbox__image');

  // Кнопка Esc //
  if (eve.code === 'Escape') {
    isOpen()
  }
  if (divEl.className.includes('is-open')) {
    const mapDefEl = defaultEl.map(value => value.original);
    const indElNum = Number(mapDefEl.indexOf(divCloseModal.src));

    // Кнопка влево, вверх //
    const mapDelLight = Number(mapDefEl.length) - 1;
    if (eve.code === 'ArrowLeft' || eve.code === 'ArrowUp') {
      if (eve.target.className === imgEl.className) {
        return;
      }
      const indLeftEl = indElNum - 1;
      divCloseModal.src = mapDefEl[indLeftEl];
      if (indElNum === 0) {
        divCloseModal.src = mapDefEl[mapDelLight];
      }
    }
    // Кнопка вправо, вниз //
    if (
      eve.code === 'ArrowRight' ||
      eve.code === 'ArrowDown' ||
      eve.code === 'Space'
    ) {
      if (eve.target.className === imgEl.className) {
        return;
      }
      const indEl = indElNum + 1;
      divCloseModal.src = mapDefEl[indEl];
      if (indEl === mapDefEl.length) {
        divCloseModal.src = mapDefEl[0];
      }
    }
  }
});