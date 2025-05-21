import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

async function loadSliderData() {
  const res = await fetch("https://api.dev.cwe.su/api/promos/?populate=*");
  const json = await res.json();
  const slides = await json.data;
  let wrapper = document.querySelector(".swiper-wrapper");

  slides.forEach((item) => {
    const { title, price } = item.product;
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");
    slide.innerHTML = `
      <div class="swiper-container">
      <div class="swiper-wrapper">
      <div class ="title">${title}</div>
      <div class="subtitle">$${price}</div>
      <button class="swiper-button">View Product</button>
      </div>
      </div>
    `;
    wrapper.appendChild(slide);
  });
  new Swiper(".swiper", {
    modules: [Navigation, Pagination, Autoplay],
    loop: true,
    autoplay: {
      delay: 5000, // 5 секунд
      disableOnInteraction: false, // автопрокрутка НЕ останавливается после взаимодействия
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

loadSliderData();
