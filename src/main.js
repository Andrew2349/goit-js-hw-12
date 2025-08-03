import {
  showLoader,
  hideLoader,
  createGallery,
  clearGallery,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
import { getImagesByQuery } from './js/pixabay-api.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalHits = 0;

form.addEventListener('submit', async e => {
  e.preventDefault();
  query = e.target.elements['search-text'].value.trim();

  if (query === '') {
    iziToast.error({
      title: 'Error',
      message: 'You need to write something',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  showLoader();
  page = 1;
  try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;

    hideLoader();
    if (data.hits.length === 0) {
      iziToast.info({ message: 'No results found', position: 'topRight' });
      return;
    }
    createGallery(data.hits);
    if (data.totalHits > 15) showLoadMoreButton();
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong',
      position: 'topRight',
    });
    console.error(error);
  }
});

loadMoreBtn.addEventListener('click', async e => {
  page += 1;
  showLoader();
  try {
    const data = await getImagesByQuery(query, page);
    hideLoader();
    createGallery(data.hits);
    scrollSmoothly();

    const totalPages = Math.ceil(totalHits / 15);
    if (page >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong',
      position: 'topRight',
    });
  }
});
function scrollSmoothly() {
  const { height: cardHeight } = document
    .querySelector('.gallery-item')
    .getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
