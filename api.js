import { updateCartCount, updateCartSidebar} from './cart.js';
import {cardClick, setupQuantityButtons} from './main.js';
import {closeMenu} from "./menu.js";

const apiUrl = 'https://api.dev.cwe.su/api/products/?populate=*';
const productsListContainerNode = document.getElementById('product-list');
async function loadProducts() {
    try {
        const res = await fetch(apiUrl);
        const result = await res.json();
        const products = result.data;
        const maxProducts = 6; // Отображать максимум 8 карточек
        const visibleProducts = products.slice(0, maxProducts);

        visibleProducts .forEach(product => {
            const card = document.createElement('div');

            card.classList.add('shop-item');

            card.dataset.id = product.id;
            card.dataset.title = product.title;
            card.dataset.price = product.price;
            card.dataset.image = product.image;
            card.dataset.color = product.color;
            card.dataset.inStock = product.itemsInStock;

            if (product.discountPercent>0) {
                product.discountPrice = (product.price *(1- product.discountPercent/100)).toFixed(2);
            }
            else{
                product.discountPrice=product.price;
            }
            card.innerHTML = `
       <div class="shop-item__image">
        <img class="shop-img" src="${product.image}" alt="${product.title}" />
         <div class="add-cart__mobile">add to cart</div>
         <div class="icons">
        <button class="add-cart">
        <img src="../../src/img/shopping-cart.svg" alt="shopping-cart" class="cart-img"/></button>
        <button class="view-product"><img src="../../src/img/eye.svg" alt="eye"/></button>
        <button class="favourite-product"><img src="../../src/img/heart.svg" alt="favourite"/></button>
        </div>
        </div>
       
        <div class="item-discount">
        <div class="discount-text">
        <p>-${product.discountPercent}%</p>
        </div>
        </div>
        <div class="shop-item__content">
        <div class="shop-item__title">
        ${product.title}
        </div>
        <div class="shop-item__price">
        <span class="shop-item__price sale">$ ${product.price}</span>$ ${product.discountPrice} 
        </div>
        </div>       
      `;
            productsListContainerNode.appendChild(card);
            const discountVisible= card.querySelector('.item-discount');
            if (product.discountPercent == 0) {
                discountVisible.classList.add('hidden');
                card.querySelector('.sale').classList.add('hidden');
            }
        });
        cardClick();
        updateCartCount();
        updateCartSidebar();
        setupQuantityButtons();

    } catch (error) {
        productsListContainerNode.innerHTML = `<p>Ошибка загрузки товаров 😢</p>`;
        console.error(error);
    }
}

loadProducts();
closeMenu();