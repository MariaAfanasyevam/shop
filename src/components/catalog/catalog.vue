<script setup>
import CardList from '../card-list/card-list.vue'
import { computed } from 'vue'


const props = defineProps({
  items:{
    type: Array,
  },
  limit: {
    type: Number,
  },
})


const limitedItems = computed(() => props.items.slice(0, props.limit ?? props.items.length))
</script>
<template>
  <div class="catalog-list__container">
    <CardList :items="limitedItems"/>
  </div>
</template>

<style src="./catalog.scss" lang="scss" scoped></style>
