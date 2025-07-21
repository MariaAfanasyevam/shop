<script setup>
import CardList from './card-list.vue'
import { computed, onMounted } from 'vue'
import { useCardStore } from '../store/cardStore'

const cardStore = useCardStore()
const props = defineProps({
  limit: {
    type: Number,
  },
})

onMounted(async () => {
  await cardStore.fetchItems()
})
const limitedItems = computed(() => cardStore.items.slice(0, props.limit ?? cardStore.items.length))
</script>
<template>
  <div class="shop-container">
    <CardList :items="limitedItems" />
  </div>
</template>

<style lang="scss" scoped></style>
