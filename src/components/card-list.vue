<script setup >
import Card from './card.vue'
import { useCardStore } from '../store/cardStore'
import { useCartStore } from '../store/cartStore'
const cardStore = useCardStore()
const cartStore = useCartStore()

defineProps({
  items: Array,
  isFavorites: Boolean,
})
</script>
<template>
  <div class="shop-items">
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :image="item.image"
      :title="item.title"
      :price="item.price"
      :discountPercent="item.discountPercent"
      :productId="item.documentId"
      :itemsInStock="item.itemsInStock"
    />
  </div>
</template>
