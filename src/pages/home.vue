<script setup>
import Catalog from '../components/catalog.vue'
import Slider from '../components/slider.vue'

</script>
<template>
  <div class="main-container container"><Slider /></div>
  <div class="shop-container container">
    <div class="shop-title">
      <div class="shop-title__text">Shop The Latest</div>
      <router-link to="/shop">
        <div class="shop-title__view">View All</div>
      </router-link>
    </div>
    <Catalog :limit="6"/>
  </div>
</template>

<style lang="scss" ></style>
