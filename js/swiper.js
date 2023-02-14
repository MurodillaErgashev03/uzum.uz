import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js'



const swiper = new Swiper('.swiper', {
    loop: true,

     delay:1000,
     autoplay: true,

     effect: 'flip',
  
   
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },


    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });