<script setup>
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
// import Swiper and modules styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { onMounted, ref } from 'vue'
import axios from 'axios'

const slides = ref([])
const fetchSliderItems = async () => {
  try {
    const { data } = await axios.get(`https://api.dev.cwe.su/api/promos/?populate=*`)
    slides.value = await data.data
    console.log(slides.value)
  } catch (e) {
    console.log(e)
  }
}
onMounted(async () => {
  await fetchSliderItems()
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
      <router-link :to="{ name: 'Product', params: { id: slide.product.documentId } }">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="slide-title">
              <p>{{ slide.product.title }}</p>
            </div>
            <div class="slide-subtitle">$ {{ slide.product.price }}</div>
            <button class="swiper-button">View Product</button>
          </div>
        </div>
      </router-link>
    </swiper-slide>
  </Swiper>
</template>

<style scoped lang="scss">
.slide-title {
  font-size: 1.7rem;
}
.slide-subtitle {
  font-size: 1.5rem;
  margin-top: 10px;
}
.swiper-pagination-bullet {
  border: 1px solid white;
  border-radius: 50%;
  background: white;
  opacity: 1;
  width: 9px;
  height: 9px;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.2);
    opacity: 0.8;
  }
}

.swiper-pagination-bullet-active {
  background: transparent;
  border-color: white;
  width: 16px;
  height: 16px;
  transition: all 0.3s ease;
}
</style>
