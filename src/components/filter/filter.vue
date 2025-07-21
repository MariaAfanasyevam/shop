<script setup>
import { useCardStore } from '../../store/cardStore.js'
import { useFilterStore } from '../../store/filterStore.js'

const cardStore = useCardStore()
const filterStore = useFilterStore()

const applyFilters = () => {
  cardStore.fetchItems()
  filterStore.closeFilterMenu()
}
</script>

<template>
  <div class="filter-menu" id="filter">
    <div class="shop-search">
      <div class="form__search">
        <input
          type="text"
          class="form__input"
          placeholder="Search..."
          name="search"
          id="search"
          @input="cardStore.onChangeSearchInput($event.target.value)"
        />
        <button type="button"><img src="/img/search.svg" alt="search" /></button>
      </div>
    </div>
    <div class="search-list">
      <select id="sort-filter" name="sort" @change="cardStore.onChangeSelect">
        <option selected disabled>Sort by:</option>
        <option value="price">Price</option>
        <option value="title">Name</option>
        <option value="date">Date</option>
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
    <div class="filter-section">
      <button class="filter-btn" @click="applyFilters">apply filters</button>
      <button class="filter-btn" @click="filterStore.resetAndCloseFilters" id="close-filter">reset filters</button>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style src="./filter.scss" lang="scss" scoped></style>
