<script setup lang="ts">
import { reactive, watch } from 'vue'
import debounce from 'lodash.debounce'

const emit = defineEmits<{
  (event: 'update-filters', payload: Filters): void
  (event: 'reset-filters'): void
  (event: 'apply-filters'): void
}>()

interface Filters {
  sortBy: string,
  searchQuery: string,
  onSale: boolean,
  inStock: boolean,
}
const filters = reactive <Filters>({
  sortBy: '',
  searchQuery: '',
  onSale: false,
  inStock: false,
})

watch(
  () => ({
    sortBy: filters.sortBy,
    onSale: filters.onSale,
    inStock: filters.inStock,
  }),
  () => {
    emit('update-filters', { ...filters })
  }
)

watch(
  () => filters.searchQuery,
  debounce(() => {
    emit('update-filters', { ...filters })
  }, 500)
)
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
          v-model="filters.searchQuery"
        />
        <button type="button"><img src="/img/search.svg" alt="search" /></button>
      </div>
    </div>
    <div class="search-list">
      <select id="sort-filter" name="sort" v-model="filters.sortBy">
        <option selected disabled value="">Sort by:</option>
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
        <input type="checkbox" v-model="filters.onSale" />
        <span class="switch-btn"></span>
      </label>
    </div>
    <div class="shop-search__radio">
      <div>
        <a class="radio-title">In stock</a>
      </div>
      <label class="switch">
        <input type="checkbox" v-model="filters.inStock" />
        <span class="switch-btn"></span>
      </label>
    </div>
    <div class="filter-section">
      <button class="filter-btn" @click="emit('apply-filters')">apply filters</button>
      <button class="filter-btn" @click="emit('reset-filters')" id="close-filter">reset filters</button>
    </div>
  </div>
</template>

<style src="./filter.scss" lang="scss" scoped></style>
