<script setup>
import Catalog from '../components/catalog.vue'
import Filter from '../components/filter/filter.vue'
import { ref } from 'vue'
import { useFilterStore } from '../store/filterStore.js'
import { useCardStore } from '../store/cardStore.js'
import { useCartStore } from '../store/cartStore.js'

const filterStore = useFilterStore()
const cartStore= useCartStore()
const cardStore = useCardStore()
const searchValue = ref('')
const goToPage = (page) => {
  if (page >= 1 && page <= cardStore.totalPages) {
    cardStore.currentPage = page
    cardStore.fetchItems()
  }
}
</script>
<template>
  <div class="container">
    <Filter v-if="filterStore.filterOpen" @close-filter-menu="filterStore.closeFilterMenu" />
  </div>

  <div class="container">
    <div class="shop-title">
      <div class="shop-title__text">Shop The Latest</div>
    </div>
  </div>

  <div class="shop-aside container">
    <div class="filter" id="open-filter" @click="filterStore.filterMenuOpen">
      <img src="/img/Filter.svg" alt="filter" />Filters
    </div>
    <div class="shop-aside__form">
      <div class="shop-search">
        <div class="form__search">
          <input
            type="text"
            class="form__input"
            placeholder="Search..."
            name="search"
            id="search"
            v-model="searchValue"
          />
          <button type="button">
            <img src="/img/search.svg" alt="search" @click="cardStore.searchByInputValue(searchValue)" />
          </button>
        </div>
      </div>
      <div class="search-list">
        <select id="sort" name="sort" @change="cardStore.onChangeSelect">
          <option selected disabled>Sort by:</option>
          <option value="price">Price</option>
          <option value="title">Name</option>
          <option value="createdAt">Date</option>
        </select>
      </div>
      <div class="shop-search__radio">
        <div>
          <a class="radio-title">On sale</a>
        </div>
        <label class="switch">
          <input type="checkbox" v-model="cardStore.filters.onSale" />
          <span class="switch-btn"></span>
        </label>
      </div>
      <div class="shop-search__radio">
        <div>
          <a class="radio-title">In stock</a>
        </div>
        <label class="switch">
          <input type="checkbox" v-model="cardStore.filters.inStock" />
          <span class="switch-btn"></span>
        </label>
      </div>
    </div>
    <div class="shop-container">
      <Catalog />
      <div class="button-section">
        <button
          class="button-section__item page-button disabled"
          type="button"
          :disabled="cardStore.currentPage === 1"
          @click="goToPage(cardStore.currentPage - 1)"
        >
          Prev
        </button>
        <button
          v-for="page in cardStore.totalPages"
          :key="page"
          class="button-section__item page-number"
          :class="{ 'selected-page': page === cardStore.currentPage }"
          @click="goToPage(page)"
          type="button"
        >
          {{ page }}
        </button>
        <button
          class="button-section__item page-button disabled"
          type="button"
          :disabled="cardStore.currentPage === cardStore.totalPages"
          @click="goToPage(cardStore.currentPage + 1)"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
