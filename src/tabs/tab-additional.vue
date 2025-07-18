<script setup>
import { useProductStore } from '../store/productStore.js'

import { storeToRefs } from 'pinia'

const productStore = useProductStore()

const { request } = storeToRefs(productStore)
</script>
<template>
  <div class="product__description">
    <p><span class="description__category">Weight:</span> {{ request.weight }} kg</p>
    <p><span class="description__category">Dimentions:</span> {{ request.dimentions }} cm</p>
    <p><span class="description__category">Colours:</span> {{ request.color }}</p>
    <p><span class="description__category">Material:</span> {{ request.material }}</p>
  </div>
</template>

<style lang="scss" scoped></style>
