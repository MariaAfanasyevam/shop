import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './src/src/styles/style.scss';

async function loadSliderData() {
    const res = await fetch('/slider.json');
    const json = await res.json();
    const slides = json.data;

    const wrapper = document.querySelector('.swiper-wrapper');

    slides.forEach(item => {
        const { title, price, image } = item.product;

        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');

        slide.innerHTML = `
      <div class="swiper-container">
      
      <div class ="title">${title}</div>
      <div class="subtitle">$${price}</div>
      <button class="swiper-button">View Product</button>
  </div>
    `;

        wrapper.appendChild(slide);
    });
   // <img src="${image}" alt="${title}">
    new Swiper('.swiper', {
        modules: [Navigation, Pagination],
        loop: true,
        autoplay: {
            delay: 1000,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    });
}

loadSliderData();
