<script setup>
const emit = defineEmits(['closeFilterMenu'])
</script>
<template>
  <div class="filter-menu" id="filter">
    <div class="shop-search">
      <div class="form__search">
        <input type="text" class="form__input" placeholder="Search..." name="search" id="search" />
        <button type="button"><img src="../../public/img/search.svg" alt="search" /></button>
      </div>
    </div>
    <div class="search-list">
      <select id="sort-filter" name="sort">
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
    <div class="filter-section">
      <button class="filter-btn" @click="() => emit('closeFilterMenu')">apply filters</button>
      <button class="filter-btn" @click="() => emit('closeFilterMenu')" id="close-filter">reset filters</button>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
