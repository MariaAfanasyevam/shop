<script setup>
import CardList from './CardList.vue'
import { onMounted } from 'vue'
import { useCardStore } from '../store/cardStore'
import { useCartStore } from '../store/cartStore.js'

const cardStore = useCardStore()
const cartStore = useCartStore()

onMounted(async () => {
  await cardStore.fetchItems()
})
</script>
<template>
  <div class="shop-container">
    <CardList :items="cardStore.items" />
  </div>
</template>

<style lang="scss" scoped></style>
