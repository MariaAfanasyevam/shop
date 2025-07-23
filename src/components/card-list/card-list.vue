<script setup>
import Card from '../card/card.vue'

defineProps({
  items: Array,
  isFavorites: Boolean,
})
</script>
<template>
  <div class="card-list" v-auto-animate>
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
<style src="./card-list.scss" lang="scss" ></style>