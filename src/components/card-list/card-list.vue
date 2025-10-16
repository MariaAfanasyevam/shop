<script setup lang="ts">

import Card, {CardProps} from '../card/card.vue'

interface Props {
items: CardProps[]
}
defineProps<Props>()

</script>
<template>
  <div class="card-list" v-auto-animate>
      <Card
        class="shop-item"
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :image="item.image"
      :title="item.title"
      :price="item.price"
      :discountPercent="item.discountPercent"
      :documentId="item.documentId"
      :itemsInStock="item.itemsInStock"
    />
  </div>
</template>
<style src="./card-list.scss" lang="scss" ></style>