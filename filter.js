const closeFilter = document.getElementById('close-filter');
const openFilter = document.getElementById('open-filter');
const filter=document.getElementById('filter');

function handleFilter() {
    openFilter.addEventListener('click', () => {
        filter.classList.toggle('hidden');
    });
    closeFilter.addEventListener('click', () => {
        filter.classList.toggle('hidden');
    });
}

handleFilter();