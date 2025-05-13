const burger = document.getElementById('burger');
const menu = document.getElementById('mobile-menu');
const closeFilter = document.getElementById('close-filter');
const openFilter = document.getElementById('open-filter');
const filter=document.getElementById('filter');
console.log(burger);

export function closeMenu() {

    openFilter.addEventListener('click', () => {
        filter.classList.toggle('hidden');
    });
   closeFilter.addEventListener('click', () => {
        filter.classList.toggle('hidden');
    });
    burger.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        burger.classList.toggle('active');
    });
    // closeBtn.addEventListener('click', () => {
    //     menu.classList.add('hidden');
    // });

}
