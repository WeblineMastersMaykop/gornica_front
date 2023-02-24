//СМАХИВАТЕЛЬ МОБИЛЬНОГО МЕНЮ

import Xwiper from 'xwiper';

let menuOffcanvasEl = document.getElementById('Offcanvas')
if (menuOffcanvasEl) {
   let menuOffcanvas = new bootstrap.Offcanvas(menuOffcanvasEl);
   const xwiper = new Xwiper('#Offcanvas');
   xwiper.onSwipeRight(() => {
      menuOffcanvas.hide();
   });
}

let bimOffcanvasEl = document.getElementById('offcanvasBIMmenu')
if (bimOffcanvasEl) {
   let bimOffcanvas = new bootstrap.Offcanvas(bimOffcanvasEl);
   const xwiper2 = new Xwiper('#offcanvasBIMmenu');
   xwiper2.onSwipeLeft(() => {
      bimOffcanvas.hide();
   });
}

// let bimOffcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasBIMmenu'));
// if (bimOffcanvas) {
//    const xwiper2 = new Xwiper('#offcanvasBIMmenu');
//    xwiper2.onSwipeLeft(() => {
//       bimOffcanvas.hide();
//    });
// }


//ПЛАГИН МАСОК ИНПУТОВ

import Cleave from 'cleave.js';
import CleavePhone from 'cleave.js/dist/addons/cleave-phone.ru.js';

let PhoneInput = document.querySelectorAll('.input-phone');
if (PhoneInput) {
   PhoneInput.forEach(function (el) {
      new Cleave(el, {
         phone: true,
         phoneRegionCode: 'RU',
         prefix: '+7',
         noImmediatePrefix: true,
         blocks: [4, 3, 3, 4]
      })
   });
}


// ПРОСМОТРЩИК ФОТО

import { Fancybox } from "@fancyapps/ui";
import ru from "@fancyapps/ui/src/Fancybox/l10n/ru.js";
Fancybox.defaults.l10n = ru;
Fancybox.bind('[data-fancybox]', {
   Toolbar: {
      display: ["counter", "zoom", "close"],
   },
   Thumbs: {
      autoStart: false,
   },
});


//ГЛАВНЫЙ СЛАЙДЕР

import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';

const mainSlider = document.querySelector('.main-slider');

if (mainSlider) {
   const swiper1 = new Swiper(mainSlider, {
      modules: [Navigation, Pagination, Autoplay],
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 32,
      speed: 500,
      loopFillGroupWithBlank: true,
      loop: true,
      autoplay: {
         delay: 50000,
         pauseOnMouseEnter: true,
         disableOnInteraction: false,
      },
      navigation: {
         nextEl: ".sbn-1",
         prevEl: ".sbp-1",
      },
      pagination: {
         el: ".swiper-pagination",
         clickable: true,
         renderBullet: function (index, className) {
            return '<span class="' + className + '"></span>';
         },
      },
   });
}


// СЛАЙДЕР КАТАЛОГА НА ГЛАВНОЙ

const catalogueSlider = document.querySelector('.catalogue-slider');

if (catalogueSlider) {
   const swiper2 = new Swiper(catalogueSlider, {
      modules: [Navigation, Autoplay],
      slidesPerView: 1.2,
      slidesPerGroup: 1,
      spaceBetween: 16,
      speed: 500,
      loop: true,
      loopFillGroupWithBlank: true,
      autoplay: {
         delay: 5000,
         pauseOnMouseEnter: true,
         disableOnInteraction: false,
      },
      navigation: {
         nextEl: ".sbn-2",
         prevEl: ".sbp-2",
      },
      breakpoints: {
         576: {
            slidesPerView: 2,
            spaceBetween: 32,
         },

         992: {
            slidesPerView: 3,
         },
      }
   });
}

// СЛАЙДЕР ФОТОГРАФИЙ ТОВАРА

const productSlider = document.querySelector('.product-slider');

if (productSlider) {
   const swiper2 = new Swiper(productSlider, {
      modules: [Navigation],
      slidesPerView: 1.2,
      slidesPerGroup: 1,
      spaceBetween: 16,
      speed: 500,
      loopFillGroupWithBlank: true,
      navigation: {
         nextEl: ".sbn-3",
         prevEl: ".sbp-3",
      },
      breakpoints: {
         576: {
            slidesPerView: 2,

         },

         992: {
            slidesPerView: 3,
            spaceBetween: 32,
         },

         1200: {
            slidesPerView: 4,
         },
      }
   });
}


import * as flsFunctions from "./modules/functions.js";
flsFunctions.isWebp();
flsFunctions.FocusTabbing();
flsFunctions.ScrollToTop();
flsFunctions.FormatNumber();
flsFunctions.searchToggle();
flsFunctions.animationPlay();
flsFunctions.slidedownDropdown();