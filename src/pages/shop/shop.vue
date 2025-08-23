<script setup lang="ts">
import Catalog from '../../components/catalog/catalog.vue'
import { onMounted, reactive, ref, watch } from 'vue'
import FilterDesktop from '../../components/FilterDesktop/filterDesktop.vue'
import Filter from '../../components/filter/filter.vue'
import axios from 'axios'
import {CardProps} from "@/types/product";

const defaultFilters: Filters= {
  sortBy: '',
  searchQuery: '',
  onSale: false,
  inStock: false,
}
const filters = reactive<Filters>({
  sortBy: 'title',
  searchQuery: '',
  onSale: false,
  inStock: false,
})

interface Item {
  id: string
  attributes: Record<string, CardProps>
  quantity: number
}

interface Params {
  'pagination[page]': number
  'pagination[pageSize]': number
  sort?: string
  'filters[title][$containsi]'?: string
  'filters[discountPercent][$gt]'?: number
  'filters[itemsInStock][$gt]'?: number
}

const params: Params = {
  'pagination[page]': 1,
  'pagination[pageSize]': 10,
}

const items = ref<Item[]>([])
const currentPage = ref<number>(1)
const pageSize = ref<number>(6)
const totalPages = ref<number>(2)

interface Filters {
  sortBy: string
  searchQuery: string
  onSale: boolean
  inStock: boolean
}

interface ApiResponse {
  data:Item[]
  meta:{
    pagination:{
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
const filterOpen = ref<boolean>(false)
const isLoading = ref(true)
const hasResults = ref<boolean>()

const fetchItems = async () => {
  try {
    isLoading.value = true
    const params: Params = {
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
    const { data } = await axios.get<ApiResponse>(`https://api.dev.cwe.su/api/products/?populate=*`, {
      params,
    })
    const result = data.data
    hasResults.value = Boolean(result.length)
    setTimeout(() => {
      items.value = result.map((obj: Item) => ({
        ...obj,
        quantity: 1,
      }))
      totalPages.value = data.meta.pagination.pageCount
    }, 500)
    console.log(result.length , hasResults.value)
  } catch (e) {
    console.log(e)
  } finally {
    isLoading.value = false
  }
}
const updateFiltersFromChild = (newFilters: Filters) => {
  filters.sortBy = newFilters.sortBy
  filters.searchQuery = newFilters.searchQuery
  filters.onSale = newFilters.onSale
  filters.inStock = newFilters.inStock
}
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    fetchItems()
  }
}

const filterMenuOpen = ():void => {
  filterOpen.value = true
  document.body.style.overflow = filterOpen.value ? 'hidden' : 'visible'
}

const closeFilterMenu = () => {
  filterOpen.value = false
  document.body.style.overflow =  'visible'
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
    <div class="shop-title underline">
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
    <div v-else>
      <div v-if="!hasResults" class="result-wrapper">Ничего не найдено</div>
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
            :class="{ 'selected-page': page === currentPage }"
            @click="goToPage(page)"
            type="button"
          >
            {{ page }}
          </button>
          <button
            class="button-section__item page-button"
            type="button"
            :disabled="currentPage === totalPages"
            @click="goToPage(currentPage + 1)"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./shop.scss" lang="scss" scoped></style>
