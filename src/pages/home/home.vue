<script setup lang="ts">
import Catalog from '../../components/catalog/catalog.vue'
import Slider from '../../components/slider/slider.vue'
import { onMounted, ref } from 'vue'
import {fetchItems} from '../../api'


interface Item {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}
const items = ref<Item[]>([])
const fetchHomeItems = async () : Promise<void>=> {
  try {
    const { data } = await fetchItems()
    const result = data.data as Omit<Item, 'quantity'>[]
    items.value = result.map((obj) => ({
      ...obj,
      quantity: 1,
    }))
  } catch (e) {
    console.log(e)
  }
}

onMounted(async () => {
   await fetchHomeItems()
})
</script>

<template>
  <div class="main-container container"><Slider /></div>
  <div class="shop-container container">
    <div class="home-title">
      <div class="home-title__text">Shop The Latest</div>
      <router-link to="/shop">
        <div class="home-title__view">View All</div>
      </router-link>
    </div>
    <Catalog :items="items" :limit="6" />
  </div>
</template>

<style src="./home.scss" lang="scss"></style>
