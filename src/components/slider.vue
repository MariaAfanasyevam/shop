<script setup>
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { onMounted, ref } from 'vue'
import { fetchSliderItems } from '../api.js'


const slides = ref([])

onMounted(async () => {
  slides.value = await fetchSliderItems()
})
</script>
<template>
  <Swiper
    :modules="[Navigation, Pagination]"
    :slides-per-view="1"
    :space-between="20"
    :pagination="{ clickable: true }"
    class="swiper"
  >
    <swiper-slide v-for="(slide, index) in slides" :key="index">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="slide-title">
            <p>{{ slide.product.title }}</p>
          </div>
          <div class="slide-subtitle">$ {{ slide.product.price }}</div>
          <router-link :to="{ name: 'Product', params: { id: slide.product.documentId } }"
            ><button class="swiper-button">View Product</button>
          </router-link>
        </div>
      </div>
    </swiper-slide>
  </Swiper>
</template>

<style scoped lang="scss">

</style>
