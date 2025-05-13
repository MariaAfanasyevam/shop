import {setupQuantityButtons} from "./main.js";

export function addToCart(product) {
    const  cartStorage = JSON.parse(localStorage.getItem('cart')) || [];
    const existingCard = cartStorage.find(item => item.id === product.id);
    const inStock = Number(product.inStock);

    if (existingCard) {
        if (existingCard.quantity >= inStock) {
            alert("Достигнут лимит доступного количества товара");
            return;
        }
        existingCard.quantity += 1;

    } else {
        if (inStock <= 0) {
            alert("Товар закончился");
            return;
        }
        cartStorage.push(product);
      //  updateCartSidebar(product);
        console.log('Добавлен товар:', product.id);
    }

    localStorage.setItem('cart', JSON.stringify(cartStorage));

    updateCartCount();
    updateCartSidebar();
    setupQuantityButtons();
}


export function updateCartCount() {
    const cartStorage = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cartStorage.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const cartCount = document.getElementById('cart-total');
    const cartIcon = document.getElementById('cart-total');

    if (cartCount) {
        cartCount.textContent = `${count}`;
        document.getElementsByClassName('items').textContent = `${count} items`;

    }
    if (count === 0) {
        cartIcon.classList.add('hidden');
    }
    else {
            cartIcon.classList.remove('hidden');
        }
    setupQuantityButtons();
}

export function updateCartSidebar(){
    const cartContainer = document.querySelector('.items-container');
    const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];
    const totalElem = document.querySelector('.total');
    const totalItems = document.querySelector('.items');
    cartContainer.innerHTML = '';
    let totalSum  = 0;
    let alltotal=0;

    cartProducts.forEach(product =>{
    const cartCard = document.createElement('li');

    cartCard.className = 'item-container';
    cartCard.dataset.id = product.id;
    cartCard.innerHTML = `
    <img src="${product.image}" alt="${product.title}" class="cart-img"/>
						<div class="item-content">
							<h1>${product.title}</h1>
							<div class="item-color">${product.color} / Medium</div>
							<p class="item-price">$ ${product.price}</p>
							<div class="item-quantity">
								<span>QTY:</span>
								<span class="remove-item">-</span>
								<span class="item-timer">${product.quantity}</span>
								<span class="add-item">+</span>
							</div>
						</div>
						<div class="delete-icon"><button class="delete-button"><img src="src/src/img/delete.svg" alt="delete" /></button> </div>
      `;
    cartContainer.appendChild(cartCard);
    totalSum += product.price * product.quantity;
    alltotal+=product.quantity;
});
    if (totalElem) {
        totalElem.textContent = `$ ${totalSum.toFixed(2)}`;
    }
    if (totalItems) {
        totalItems.textContent = `${alltotal} items`;
        document.querySelector('.subtotal').textContent=`Subtotal (${alltotal} items)`;
    }
   // setupQuantityButtons();
}