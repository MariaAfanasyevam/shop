import { updateCartCount, updateCartSidebar } from "./cart.js";
import { cardClick, setupQuantityButtons, checkRadio } from "./main.js";
import { handleCloseMenu } from "./menu.js";

const apiUrl = "https://api.dev.cwe.su/api/products/?populate=*";
const productsListContainerNode = document.getElementById("product-list");
async function loadProducts() {
  try {
    const res = await fetch(apiUrl);
    const result = await res.json();
    const products = await result.data;
    const maxProducts = 6;
    const visibleProducts = products.slice(0, maxProducts);

    visibleProducts.forEach((product) => {
      const card = document.createElement("div");

      card.classList.add("shop-item");
      card.dataset.id = product.id;
      card.dataset.title = product.title;
      card.dataset.price = product.price;
      card.dataset.image = product.image;
      card.dataset.color = product.color;
      card.dataset.inStock = product.itemsInStock;
      if (product.discountPercent > 0) {
        product.discountPrice = (
          product.price *
          (1 - product.discountPercent / 100)
        ).toFixed(2);
      } else {
        product.discountPrice = product.price;
      }
      card.dataset.discountPrice = product.discountPrice;
      card.innerHTML = `
        <div class="shop-item__image">
        <img class="shop-img" src="${product.image}" alt="${product.title}" />
         <div class="add-cart__mobile">add to cart</div>
         <div class="icons">
        <button class="add-cart">
        <img src="/img/shopping-cart.svg"  class="cart-img" alt="Add to cart"/></button>
        <button class="view-product"><img src="/img/eye.svg" alt="Open product"/></button>
        <button class="favourite-product"><img src="/img/heart.svg" alt="Add to favourites"/></button>
        </div>
        </div>
       
        <div class="item-discount">
        <p>-${product.discountPercent}%</p>
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
      const discountVisible = card.querySelector(".item-discount");
      if (product.discountPercent == 0) {
        discountVisible.classList.add("hidden");
        card.querySelector(".sale").classList.add("hidden");
      }
      if (product.itemsInStock == 0)
        card.querySelector(".item-discount").innerHTML = "sold out";
    });
    cardClick();
    updateCartCount();
    updateCartSidebar();
    setupQuantityButtons();
  } catch (error) {
    productsListContainerNode.innerHTML = `<p>Ошибка загрузки товаров😢</p>`;
    console.error(error);
  }
}

loadProducts();
handleCloseMenu();
checkRadio();
