
const buttons = document.querySelectorAll('.add-cart');

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.shop-item');
        const product = {
            id: card.dataset.id,
            title: card.dataset.title,
            price: Number(card.dataset.price),
            quantity: 1
        };

        addToCart(product);
    });
});

function addToCart(product) {
    // Получаем текущую корзину
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Проверяем — есть ли уже такой товар
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push(product);
    }

    // Обновляем localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Товар "${product.title}" добавлен в корзину, Итого: ${existing.quantity} `);
    updateCartCount();

}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    const cartCount = document.getElementById('cart-total');
    if (cartCount) {
        cartCount.textContent = `${count}`;
    }
}
updateCartCount();