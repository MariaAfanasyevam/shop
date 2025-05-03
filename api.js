import {addToCart, updateCartCount, updateCartSlider} from './cart.js';

const apiUrl = 'https://api.dev.cwe.su/api/products/?populate=*';
const container = document.getElementById('product-list');

async function loadProducts() {
    try {
        const res = await fetch(apiUrl);
        const result = await res.json();
        const products = result.data;

        products.forEach(product => {

            const card = document.createElement('div');
            card.className = 'shop-item';
            card.dataset.id = product.id;
            card.dataset.title = product.title;
            card.dataset.price = product.price;
            card.dataset.image = product.image;
            card.dataset.color = product.color;
            card.innerHTML = `
       <div class="shop-item__image">
        <img class="shop-img" src="${product.image}" alt="${product.title}" />
        <div class="icons">
        <button class="add-cart">
          <svg width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.05473 16.1624H8.05588C8.05683 16.1624 8.05778 16.1622 8.05874 16.1622H21.3379C21.6648 16.1622 21.9522 15.9454 22.0421 15.631L24.9718 5.37713C25.0349 5.15607 24.9907 4.91841 24.8524 4.73492C24.7139 4.55144 24.4974 4.44348 24.2676 4.44348H6.36558L5.84202 2.08733C5.76744 1.75221 5.47028 1.51379 5.12695 1.51379H0.732422C0.327873 1.51379 0 1.84167 0 2.24622C0 2.65076 0.327873 2.97864 0.732422 2.97864H4.53949C4.63219 3.39616 7.04498 14.2539 7.18384 14.8786C6.40545 15.2169 5.85937 15.993 5.85937 16.8947C5.85937 18.1062 6.84509 19.0919 8.05664 19.0919H21.3379C21.7424 19.0919 22.0703 18.764 22.0703 18.3595C22.0703 17.9549 21.7424 17.6271 21.3379 17.6271H8.05664C7.65285 17.6271 7.32422 17.2984 7.32422 16.8947C7.32422 16.4914 7.65171 16.1634 8.05473 16.1624ZM23.2965 5.90833L20.7853 14.6974H8.6441L6.69098 5.90833H23.2965Z" fill="black"/>
          <path d="M7.32422 21.2889C7.32422 22.5005 8.30994 23.4862 9.52148 23.4862C10.733 23.4862 11.7187 22.5005 11.7187 21.2889C11.7187 20.0774 10.733 19.0917 9.52148 19.0917C8.30994 19.0917 7.32422 20.0774 7.32422 21.2889ZM9.52148 20.5565C9.92527 20.5565 10.2539 20.8852 10.2539 21.2889C10.2539 21.6927 9.92527 22.0214 9.52148 22.0214C9.1177 22.0214 8.78906 21.6927 8.78906 21.2889C8.78906 20.8852 9.1177 20.5565 9.52148 20.5565Z" fill="black"/>
          <path d="M17.6758 21.2889C17.6758 22.5005 18.6615 23.4862 19.873 23.4862C21.0846 23.4862 22.0703 22.5005 22.0703 21.2889C22.0703 20.0774 21.0846 19.0917 19.873 19.0917C18.6615 19.0917 17.6758 20.0774 17.6758 21.2889ZM19.873 20.5565C20.2768 20.5565 20.6055 20.8852 20.6055 21.2889C20.6055 21.6927 20.2768 22.0214 19.873 22.0214C19.4693 22.0214 19.1406 21.6927 19.1406 21.2889C19.1406 20.8852 19.4693 20.5565 19.873 20.5565Z" fill="black"/>
          </svg></button>
        <button class="view-product"><svg width="25" height="25" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.12496 16L3.76246 17.6375C10.5125 24.3875 21.4937 24.3875 28.2437 17.6375L29.875 16L28.2375 14.3625C21.4875 7.6125 10.5062 7.6125 3.75621 14.3625L2.12496 16ZM16 23.8875C11.2625 23.8875 6.52496 22.0813 2.91871 18.475L0.862463 16.4188C0.631213 16.1875 0.631213 15.8125 0.862463 15.575L2.91871 13.5188C10.1312 6.30625 21.8687 6.30625 29.0812 13.5188L31.1375 15.575C31.3687 15.8062 31.3687 16.1813 31.1375 16.4188L29.0812 18.475C25.475 22.0813 20.7375 23.8875 16 23.8875Z" fill="black" stroke="black" stroke-width="0.3"/>
        <path d="M16 11.4688C13.5 11.4688 11.4687 13.5 11.4687 16C11.4687 18.5 13.5 20.5312 16 20.5312C18.5 20.5312 20.5312 18.5 20.5312 16C20.5312 13.5 18.5 11.4688 16 11.4688ZM16 21.7188C12.8437 21.7188 10.2812 19.15 10.2812 16C10.2812 12.8438 12.85 10.2812 16 10.2812C19.15 10.2812 21.7187 12.85 21.7187 16C21.7187 19.1562 19.1562 21.7188 16 21.7188Z" fill="black" stroke="black" stroke-width="0.3"/>
        </svg></button>
        <button class="favourite-product"><svg width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_2046_6470)">
        <path d="M11.3428 23.1291C11.6538 23.44 12.0718 23.6134 12.5102 23.6134C12.9435 23.6134 13.3717 23.4349 13.6776 23.1291L22.8385 13.9682C24.2302 12.5764 24.9949 10.7259 25 8.76323C25 6.79545 24.2353 4.94492 22.8436 3.5532C21.4519 2.16147 19.6064 1.39679 17.6387 1.39679C15.7066 1.39679 13.8866 2.13599 12.5051 3.48183C11.1185 2.13089 9.29343 1.3866 7.35624 1.3866C5.39356 1.3866 3.54812 2.15128 2.1564 3.5379C0.764682 4.92962 0 6.78015 0 8.74794C0 10.7106 0.76978 12.5611 2.1615 13.9529L11.3428 23.1291ZM3.04343 4.42493C4.19555 3.27281 5.73002 2.63558 7.36134 2.63558C8.99266 2.63558 10.5322 3.27281 11.6894 4.43003L12.0667 4.80727C12.1839 4.92453 12.342 4.9908 12.5102 4.9908C12.6733 4.9908 12.8365 4.92453 12.9537 4.80727L13.3208 4.44023C14.478 3.28301 16.0124 2.64577 17.6489 2.64577C19.2802 2.64577 20.8146 3.28301 21.9668 4.43513C23.124 5.59235 23.7561 7.12681 23.7561 8.75813C23.7561 10.3895 23.1189 11.9239 21.9617 13.0811L12.7957 22.2471C12.6478 22.395 12.3777 22.395 12.2247 22.2471L3.04853 13.0709C1.89131 11.9137 1.25408 10.3793 1.25408 8.74794C1.25408 7.11661 1.89131 5.58215 3.04343 4.42493Z" fill="black" stroke="black" stroke-width="0.3"/>
        </g>
        <defs>
        <clipPath id="clip0_2046_6470">
        <rect width="25" height="25" fill="white"/>
        </clipPath>
        </defs>
        </svg></button>
        </div>
        </div>
        <div class="shop-item__content">
        <div class="shop-item__title">
        ${product.title}
        </div>
        <div class="shop-item__price">
        $ ${product.price} 
        </div>
        </div>       
      `;
            container.appendChild(card);
        });
        document.querySelectorAll('.add-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.closest('.shop-item');

                if (!card) {
                    console.error('Карточка не найдена');
                    return;
                }
                const product = {
                    id:  card.dataset.id,
                    title:  card.dataset.title,
                    price: Number( card.dataset.price),
                    image:  card.dataset.image,
                    color: card.dataset.color,
                    quantity: 1
                };

                addToCart(product);

            });

        });
        updateCartCount();
        updateCartSlider();
    } catch (error) {
        container.innerHTML = `<p>Ошибка загрузки товаров 😢</p>`;
        console.error(error);
    }
}

loadProducts();
