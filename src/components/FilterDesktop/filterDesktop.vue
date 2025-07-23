<script setup>
import { reactive, ref, watch } from 'vue'

const searchValue = ref('')

const emit = defineEmits(['update-filters'])
const filters = reactive({
  sortBy: 'title',
  searchQuery: '',
  onSale: false,
  inStock: false,
})

const searchByInputValue = (value) => {
  filters.searchQuery = value
}
watch(
  filters,
  () => {
    emit('update-filters', { ...filters })
  },
  { deep: true }
)


</script>

<template>
  <div class="shop-search">
    <div class="form__search">
      <input type="text" class="form__input" placeholder="Search..." name="search" id="search" v-model="searchValue" />
      <button type="button">
        <img src="/img/search.svg" alt="search" @click="searchByInputValue(searchValue)" />
      </button>
    </div>
  </div>
  <div class="search-list">
    <select id="sort" name="sort" v-model="filters.sortBy">
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
</template>

<script>
export default {}
</script>

<style src="./filterDesktop.scss" lang="scss" scoped></style>
