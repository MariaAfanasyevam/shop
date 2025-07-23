<script setup>
import Catalog from '../../components/catalog/catalog.vue'
import Slider from '../../components/slider/slider.vue'
import { onMounted, ref } from 'vue'
import {fetchItems} from '../../api.js'

const items = ref([])

const fetchHomeItems = async () => {
  try {
    const { data } = await fetchItems()
    const result = data.data
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
