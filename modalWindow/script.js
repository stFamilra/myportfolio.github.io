'use strict';

const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.close-modal-window');
const btnsShowModalWindow = document.querySelectorAll('.show-modal-window');

const switchModalWindow = () => {
  modalWindow.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
};

const handlerModalWindow = value => {
  value.addEventListener('click', e => {
    switchModalWindow();
  });
};

for (let i = 0; i < btnsShowModalWindow.length; i++) {
  handlerModalWindow(btnsShowModalWindow[i]);
}

handlerModalWindow(btnCloseModalWindow);
handlerModalWindow(overlay);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
    switchModalWindow();
  }
});
