<script setup>
import Catalog from '../../components/catalog/catalog.vue'
import { onMounted, reactive, ref, watch } from 'vue'
import FilterDesktop from '../../components/FilterDesktop/filterDesktop.vue'
import Filter from '../../components/filter/filter.vue'
import axios from 'axios'

const filterOpen = ref(false)
const items = ref([])
const isLoading = ref(true)
const defaultFilters = {
  sortBy: '',
  searchQuery: '',
  onSale: false,
  inStock: false,
}
const filters = reactive({
  sortBy: 'title',
  searchQuery: '',
  onSale: false,
  inStock: false,
})
const currentPage = ref(1)
const pageSize = ref(24)
const totalPages = ref(2)

const fetchItems = async () => {
  try {
    isLoading.value = true;
    const params = {
      'pagination[page]': currentPage.value,
      'pagination[pageSize]': pageSize.value,
    }

    if (filters.sortBy) {
      params.sort = `${filters.sortBy}:asc`
    }
    if (filters.searchQuery) {
      params['filters[title][$containsi]'] = filters.searchQuery
    }
    if (filters.onSale) {
      params['filters[discountPercent][$gt]'] = 0
    }
    if (filters.inStock) {
      params['filters[itemsInStock][$gt]'] = 0
    }
    const { data } = await axios.get(`https://api.dev.cwe.su/api/products/?populate=*`, {
      params,
    })
    const result = data.data
    setTimeout(() => {
    items.value = result.map((obj) => ({
      ...obj,
      quantity: 1,
    }))
    totalPages.value = data.meta.pagination.pageCount
    }, 500);
  } catch (e) {
    console.log(e)
  }
  finally {
    isLoading.value = false;
  }
}
const updateFiltersFromChild = (newFilters) => {
  filters.sortBy = newFilters.sortBy
  filters.searchQuery = newFilters.searchQuery
  filters.onSale = newFilters.onSale
  filters.inStock = newFilters.inStock
}
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    fetchItems()
  }
}

const filterMenuOpen = () => {
  filterOpen.value = true
  document.body.classList.add('no-scroll')
}

const closeFilterMenu = () => {
  filterOpen.value = false
  document.body.classList.remove('no-scroll')
}

const resetAndCloseFilters = () => {
  Object.assign(filters, defaultFilters)
  closeFilterMenu()
}
const applyFilters = () => {
  closeFilterMenu()
}


watch(
  filters,
  () => {
    currentPage.value = 1
    fetchItems()
  },
  { deep: true },
)
onMounted(async () => {
  await fetchItems()
})
</script>
<template>
  <div class="container">
    <Filter
      v-if="filterOpen"
      @update-filters="updateFiltersFromChild"
      @reset-filters="resetAndCloseFilters"
      @close-filter-menu="closeFilterMenu"
      @apply-filters="applyFilters"
    />
  </div>

  <div class="container">
    <div class="shop-title">
      <div class="shop-title__text">Shop The Latest</div>
    </div>
  </div>

  <div class="shop-aside container">
    <div class="filter" id="open-filter" @click="filterMenuOpen"><img src="/img/Filter.svg" alt="filter" />Filters</div>
    <div class="shop-aside__form">
      <FilterDesktop @update-filters="updateFiltersFromChild" />
    </div>
    <div v-if="isLoading" class="loader-wrapper">
      <div class="loader"></div>
    </div>
    <div v-else class="shop-container">
      <Catalog :items="items" />
      <div class="button-section">
        <button
          class="button-section__item page-button"
          type="button"
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
        >
          Prev
        </button>
        <button
          v-for="page in totalPages"
          :key="page"
          class="button-section__item page-number"
          :class="{ 'selected-page': page === currentPage}"
          @click="goToPage(page)"
          type="button"
        >
          {{ page }}
        </button>
        <button
          class="button-section__item page-button "
          type="button"
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<style src="./shop.scss" lang="scss" scoped></style>
