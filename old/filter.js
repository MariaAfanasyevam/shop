const closeFilters = document.querySelectorAll(".filter-btn");
const openFilter = document.getElementById("open-filter");
const filter = document.getElementById("filter");

function handleFilter() {
  openFilter.addEventListener("click", () => {
    filter.classList.toggle("hidden");
  });
  const handler = () => {
    filter.classList.toggle("hidden");
  };
  closeFilters.forEach((closeFilter) => {
    closeFilter.addEventListener("click", handler);
  });
}

handleFilter();
