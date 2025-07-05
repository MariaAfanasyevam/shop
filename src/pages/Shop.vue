<script setup>
import Catalog from '../components/Catalog.vue'
import Filter from '../components/Filter.vue'
import { ref } from 'vue'

const filterOpen = ref(false)

const filterMenuOpen = () => {
  filterOpen.value = true
}
const closeFilterMenu = () => {
  filterOpen.value = false
}
</script>
<template>
  <Filter v-if="filterOpen" @close-filter-menu="closeFilterMenu" />
  <div class="shop-aside container">
    <div class="filter" id="open-filter" @click="filterMenuOpen">
      <img src="../../public/img/Filter.svg" alt="filter" />Filters
    </div>
    <div class="shop-aside__form">
      <div class="shop-search">
        <div class="form__search">
          <input type="text" class="form__input" placeholder="Search..." name="search" id="search" />
          <button type="button"><img src="../../public/img/search.svg" alt="search" /></button>
        </div>
      </div>
      <div class="search-list">
        <select id="sort" name="sort">
          <option selected disabled>Sort by:</option>
          <option value="price">Price</option>
          <option value="name">Name</option>
          <option value="date">Date</option>
        </select>
      </div>
      <div class="shop-search__radio">
        <div>
          <a class="radio-title">On sale</a>
        </div>
        <label class="switch">
          <input type="checkbox" />
          <span class="switch-btn"></span>
        </label>
      </div>
      <div class="shop-search__radio">
        <div>
          <a class="radio-title">In stock</a>
        </div>
        <label class="switch">
          <input type="checkbox" />
          <span class="switch-btn"></span>
        </label>
      </div>
    </div>
    <div class="shop-container">
      <Catalog />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
