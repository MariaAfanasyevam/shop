<script setup>
import Card from './card.vue'
import { useCardStore } from '../store/cardStore'
import { useCartStore } from '../store/cartStore'

defineProps({
  items: Array,
  isFavorites: Boolean,
})
</script>
<template>
  <div class="shop-items" v-auto-animate>
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
