export function addToCart(product) {

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push(product);
        updateCartSlider(product);
    }
    alert(`Товар "${product.title}" добавлен в корзину, Итого: ${product.quantity} `);
    localStorage.setItem('cart', JSON.stringify(cart));

    updateCartCount();
    updateCartSlider();
}

export function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const cartCount = document.getElementById('cart-total');
    if (cartCount) {
        cartCount.textContent = `${count}`;
        document.getElementsByClassName('items').textContent = `${count} items`;
    }
}
export function updateCartSlider(){
    const cartContainer = document.querySelector('.items-container');
    const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];
    const totalElem = document.querySelector('.total');
    const totalItems = document.querySelector('.items');
    cartContainer.innerHTML = '';
    let total = 0;
    let alltotal=0;
    cartProducts.forEach(cartProduct =>{
    const cartCard = document.createElement('div');
    cartCard.className = 'item-container';
    cartCard.innerHTML = `
    <img src="${cartProduct.image}" alt="${cartProduct.title}" />
						<div class="item-content">
							<h1>${cartProduct.title}</h1>
							<div class="item-color">${cartProduct.color} / Medium</div>
							<div class="item-price">$ ${cartProduct.price}</div>
							<div class="item-quantity">
								<span>QTY:</span>
								<span>-</span>
								<span class="item-timer">${cartProduct.quantity}</span>
								<span>+</span>
							</div>
						</div>
      `;
    cartContainer.appendChild(cartCard);
    total += cartProduct.price * cartProduct.quantity;
    alltotal+=cartProduct.quantity;
});
    if (totalElem) {
        totalElem.textContent = total.toFixed(2);
    }
    if (totalItems) {
        totalItems.textContent = `${alltotal} items`;
        document.querySelector('.subtotal').textContent=`Subtotal (${alltotal} items)`;
    }
}