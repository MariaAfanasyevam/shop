const burger = document.getElementById('burger');
const menu = document.getElementById('mobile-menu');

export function handleCloseMenu() {
    burger.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        burger.classList.toggle('active');
    });
}
