<script setup>
import { useProductStore } from '../store/productStore.js'

import { storeToRefs } from 'pinia'

const productStore = useProductStore()

const { request } = storeToRefs(productStore)
</script>
<template>
  <div class="product__description">
    {{ request.description }}
  </div>
</template>

<style lang="scss" scoped></style>
