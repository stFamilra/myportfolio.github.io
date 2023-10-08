'use strict';

///////////////////////////////////////
// Modal window

const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll(
  '.btn--show-modal-window'
);
const links = document.querySelector('.nav__links');
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContents = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const allSection = document.querySelectorAll('.section');
const lazyImages = document.querySelectorAll('img[data-src]');
const services = document.querySelector('.services');
const slides = document.querySelectorAll('.slide');
const sliderBtns = document.querySelectorAll('.slider__btn');
const sliderBtnRight = document.querySelector('.slider__btn--right');
const sliderBtnLeft = document.querySelector('.slider__btn--left');
const dotContainer = document.querySelector('.dots');

const openModalWindow = function (e) {
  e.preventDefault();
  modalWindow.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModalWindow = function () {
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};

const setOpacity = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const linkOver = e.target;
    const siblingLinks = linkOver
      .closest('.nav__links')
      .querySelectorAll('.nav__link');
    const logo = linkOver.closest('.nav').querySelector('img');
    const logoText = linkOver.closest('.nav').querySelector('.nav__text');

    siblingLinks.forEach(current => {
      if (current !== linkOver) {
        current.style.opacity = this;
      }
    });
    logo.style.opacity = this;
    logoText.style.opacity = this;
  }
};

const moveToSlide = slide => {
  slides.forEach((current, index) => {
    current.style.transform = `translateX(${(index - slide) * 100}%)`;
  });
};

const previousSlide = slide => {
  if (currentSlide === 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide--;
  }

  moveToSlide(currentSlide);
  activateCurrentDot(currentSlide);
};

const nextSlide = slide => {
  if (currentSlide === slides.length - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  moveToSlide(currentSlide);
  activateCurrentDot(currentSlide);
};

const createDots = () => {
  slides.forEach((_, index) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${index}"></button>`
    );
  });
};

createDots();

const activateCurrentDot = slide => {
  document
    .querySelectorAll('.dots__dot')
    .forEach(current => current.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};
activateCurrentDot(0);

btnsOpenModalWindow.forEach(current =>
  current.addEventListener('click', openModalWindow)
);

btnCloseModalWindow.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
    closeModalWindow();
  }
});

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', e => {
  section1.scrollIntoView({ behavior: 'smooth' });
});

links.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const href = e.target.getAttribute('href');
    document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
  }
});

tabContainer.addEventListener('click', e => {
  const clickedButton = e.target.closest('.operations__tab');
  // let currentContent;
  //если кликнем не по кнопке, а просто по зоне экрана, входящего в контейнер, то ничего не получим и просто выйдем из слушателя событий.
  if (!clickedButton) return;

  //active tab
  tabs.forEach(current => current.classList.remove('operations__tab--active'));
  clickedButton.classList.add('operations__tab--active');

  //active content
  tabContents.forEach(current => {
    current.classList.remove('operations__content--active');
  });
  document
    .querySelector(`.operations__content--${clickedButton.dataset.tab}`)
    .classList.add('operations__content--active');
});

nav.addEventListener('mouseover', setOpacity.bind(0.4));

nav.addEventListener('mouseout', setOpacity.bind(1));

// sticky navigation
allSection.forEach(current => current.classList.add('section--hidden'));

const navHeight = nav.getBoundingClientRect().height;
const observerCallback = (entries, observer) => {
  if (!entries[0].isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const observerOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const headerObserver = new IntersectionObserver(
  observerCallback,
  observerOptions
);
headerObserver.observe(header);

// appearance of site parts
const sectionObserver = new IntersectionObserver(
  (entries, observer) => {
    const entry = entries[0];

    // entries.forEach((current, index) => {
    //   if (current.isIntersecting) {
    //     current.target.classList.remove('section--hidden');
    //   } else {
    //     current.target.classList.add('section--hidden');
    //   }
    // });

    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  },
  {
    // options
    root: null,
    threshold: 0.1,
  }
);

allSection.forEach(currentSection => sectionObserver.observe(currentSection));

// page loading implementation

const loadingObserve = new IntersectionObserver(
  (entries, observer) => {
    const entry = entries[0];
    if (!entry.isIntersecting) return;
    // lazyImages.forEach(current => {
    //   current.src = current.dataset.src;
    //   current.classList.remove('lazy-img');
    // });
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', e => {
      entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
  },
  {
    //options
    root: null,
    threshold: 0.5,
  }
);

lazyImages.forEach(current => {
  loadingObserve.observe(current);
});

// Create the slider
let currentSlide = 0;

moveToSlide(0);

sliderBtnLeft.addEventListener('click', previousSlide);

sliderBtnRight.addEventListener('click', nextSlide);

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') previousSlide();
  if (e.key === 'ArrowRight') nextSlide();
});

dotContainer.addEventListener('click', e => {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    moveToSlide(slide);
    activateCurrentDot(slide);
  }
});
