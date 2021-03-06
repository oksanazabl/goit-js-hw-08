import { galleryItems } from './gallery-items.js';

const gallery = document.querySelector('.gallery');


function imagesItemTemplate({ preview, original, description }) {
return `
    <li class='gallery__item'>
    <a class='gallery__link' href='${original}'>
    <img
    class='gallery__image'
    src='${preview}' 
    data-source='${original}' 
    alt='${description}'/>
    </a>
    </li>`
};
    
const createGalleryMarkup = galleryItems.map(imagesItemTemplate);
gallery.insertAdjacentHTML('beforeend', createGalleryMarkup .join(''));

const newLocal = `
<div class="gallery-modal">
      <img class="gallery-modal__image" src="https://via.placeholder.com/640/480" alt="Description">
      <p class="gallery-modal__description"><span class="gallery-modal__span">Picture</span></p>
      <button class="back-btn gallery-modal__btn" type="button"> </button>
      <button class="next-btn gallery-modal__btn" type="button"> </button>
</div>
`;
const modalMarkup = newLocal;

const instance = basicLightbox.create(modalMarkup, {
  onClose: () => {
    window.removeEventListener('keydown', onEscCloseModal);
    backBtn.removeEventListener('click', onBackBtnClickBeforeImgView);
    nextBtn.removeEventListener('click', onNextBtnClicknextImgView);
  },
});

const gallModal = instance.element().querySelector('.gallery-modal');
const startImg = gallModal.firstElementChild;

const nextBtn = gallModal.querySelector('.next-btn');
const backBtn = gallModal.querySelector('.back-btn');
const modalSpan = gallModal.querySelector('.gallery-modal__span');

const getSrcForOriginalImage = ({ id, dataset: { source }, alt }) => {
  if (startImg.id !== id) {
    startImg.id = id;
  }
  startImg.src = source;
  startImg.alt = alt;
  startImg.classList.add('current-img');
  modalSpan.textContent = alt;
};

const onEscCloseModal = e => e.code === 'Escape' && instance.close();

const onBackBtnClickBeforeImgView = e => {
  const currentImg = document.getElementById(`${startImg.id}`);
  const prevImg = document.getElementById(`${startImg.id.slice(3) - 1}`);
  getSrcForOriginalImage(prevImg);
};
const onNextBtnClicknextImgView = e => {};

const onModalOpen = e => {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  const previewImg = e.target;
  getSrcForOriginalImage(previewImg);
  instance.show();

  window.addEventListener('keydown', onEscCloseModal);
  nextBtn.addEventListener('click', onNextBtnClicknextImgView);
  backBtn.addEventListener('click', onBackBtnClickBeforeImgView);
  
};

gallery.addEventListener('click', onModalOpen);