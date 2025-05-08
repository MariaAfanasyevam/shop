import {addToCart, updateCartCount, updateCartSidebar} from './cart.js';
export function cardClick() {
    document.querySelectorAll('.add-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.shop-item');
            const img = card.querySelector('.cart-img');
            if (!card) {
                console.error('Карточка не найдена');
                return;
            }
            const product = {
                id: card.dataset.id,
                title: card.dataset.title,
                price: Number(card.dataset.price),
                image: card.dataset.image,
                color: card.dataset.color,
                percent: card.dataset.percent,
                quantity: 1
            };
            img.src = 'src/src/img/shopping-cart-color.svg';
            addToCart(product);
        });
    });

    updateCartCount();
    updateCartSidebar();
}
export function setupQuantityButtons() {
    const cartItems=document.querySelectorAll('.item-container');
    cartItems.forEach(item => {
        const increaseBtn = item.querySelector('.add-item');
        const decreaseBtn = item.querySelector('.remove-item');
        const deleteBtn = item.querySelector('.delete-button');

        const id = item.dataset.id;

       increaseBtn.addEventListener('click', () => {
           changeItemQuantity(id, 1);
        });

       decreaseBtn.addEventListener('click', () => {
           changeItemQuantity(id, -1);
        });

        deleteBtn.addEventListener('click', () => {
            changeItemQuantity(id, 0);
        });
    });
}

export function changeItemQuantity(productId, delta) {
    let  cartStorage = JSON.parse(localStorage.getItem('cart')) || [];
    let existingCard = cartStorage.find(item => item.id === productId);

    if (!existingCard) return;
   if (existingCard.quantity==1 & delta== '-1') {
    return;
}
   if (delta == 0){
       cartStorage = cartStorage.filter(p => p.id !== productId);
   }
   else {
       existingCard.quantity += delta;
   }

    console.log(existingCard.quantity);
    localStorage.setItem('cart', JSON.stringify(cartStorage));
    updateCartSidebar();
    updateCartCount();
}

const burger = document.getElementById('burger');
const menu = document.getElementById('mobile-menu');
const closeBtn = document.getElementById('close-menu');

burger.addEventListener('click', () => {
    menu.classList.remove('hidden');
});

closeBtn.addEventListener('click', () => {
    menu.classList.add('hidden');
});
