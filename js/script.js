import galleryItems from './gallery-items.js';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  backdrop: document.querySelector('.lightbox__content'),
  imageLightbox: document.querySelector('.lightbox__image'),
  closeBtnLightbox: document.querySelector(
    'button[data-action="close-lightbox"]',
  ),
};

const itemList = {
  createItemList() {
    return galleryItems.map(item => this.createItem(item));
  },

  createItem(item) {
    this.galleryListItem = this.createElementAndClass('li', 'gallery__item');
    this.galleryLink = this.createElementAndClass('a', 'gallery__link');
    this.galleryImage = this.createElementAndClass('img', 'gallery__image');
    this.addAttribute(item);
    this.galleryLink.appendChild(this.galleryImage);
    this.galleryListItem.appendChild(this.galleryLink);
    return this.galleryListItem;
  },

  createElementAndClass(elementName, elementClass) {
    const element = document.createElement(elementName);
    element.classList.add(elementClass);
    return element;
  },

  addAttribute(item) {
    this.galleryLink.setAttribute('href', item.original);
    this.galleryImage.setAttribute('src', item.preview);
    this.galleryImage.setAttribute('data-source', item.original);
    this.galleryImage.setAttribute('data-index', (this.index += 1));
    this.galleryImage.setAttribute('alt', item.description);
  },
}

refs.gallery.append(...itemList.createItemList());

refs.gallery.addEventListener('click', onOpenModal);
refs.closeBtnLightbox.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onBackdropClick);

function onOpenModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  refs.lightbox.classList.add('is-open');
  const largeImage = event.target.dataset.source;
  refs.imageLightbox.src = largeImage;
  window.addEventListener('keydown', onPressEscape);
}

function onCloseModal() {
  refs.lightbox.classList.remove('is-open');
  refs.imageLightbox.src = '';
  window.removeEventListener('keydown', onPressEscape);
}

function onPressEscape(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}

function onBackdropClick(event) {
  if (event.target === event.currentTarget) {
    onCloseModal();
  }
}
