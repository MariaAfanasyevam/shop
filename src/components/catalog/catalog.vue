<script setup lang="ts">
import CardList from '../card-list/card-list.vue'
import { computed, ref } from 'vue'

interface Item{
  id: number|string
  title: string
  image: string
  price: number
  discountPercent?:number
  documentId: string
  itemsInStock?:number
}
interface Props {
  items: Item[]
  limit?: number
}
const props = defineProps<Props>()
const items = ref<Item[]>([])

const limitedItems = computed<Item[]>(() => props.items.slice(0, props.limit ?? props.items.length))
</script>
<template>
  <div class="catalog-list__container">
    <CardList :items="limitedItems"/>
  </div>
</template>

<style src="./catalog.scss" lang="scss" scoped></style>
