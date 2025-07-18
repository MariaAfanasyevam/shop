<script setup>
import Catalog from '../components/catalog.vue'
import Filter from '../components/filter.vue'
import { useFilterStore } from '../store/filterStore.js'

const filterStore = useFilterStore()
</script>
<template>
  <Filter v-if="filterStore.filterOpen" @close-filter-menu="filterStore.closeFilterMenu" />
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
          <input type="text" class="form__input" placeholder="Search..." name="search" id="search" />
          <button type="button"><img src="/img/search.svg" alt="search" /></button>
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
      <div class="button-section">
        <button class="button-section__item page-button disabled" type="button">Prev</button>
        <button class="button-section__item page-number selected-page" type="button">1</button>
        <button class="button-section__item page-number" type="button">2</button>
        <button class="button-section__item page-number" type="button">3</button>
        <button class="button-section__item page-button" type="button">Next</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
