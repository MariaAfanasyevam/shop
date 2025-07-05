<script setup>
import Card from '../components/Card.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const items = ref([])
const request = ref({})
const route = useRoute()
const imageUrls = ref([])
const quantity = ref(1)
const additionalUrl = ref('')
const mainUrl = ref('')
const allReviews = ref([])
const productReviews = ref([])
const averageRating = ref(0)
const reviewsCount = ref([])
const image1 = '/img/heart.svg'
const image2 = '/img/heartclick.svg'
const currentImage = ref(image1)
const activeTab = ref(2)

function toggleImage() {
  currentImage.value = currentImage.value === image1 ? image2 : image1
}

if (request.value?.additionalImages?.additionalImages?.length > 0) {
  const imgObj = request.value.additionalImages.additionalImages[0]
  imageUrls.value = Object.values(imgObj)
}
const setActiveTab = (id) => {
  activeTab.value = id
}
const fetchSimilarItems = async () => {
  try {
    const { data } = await axios.get(`https://api.dev.cwe.su/api/products/?pagination[pageSize]=3`)
    const result = data.data
    items.value = result.map((obj) => ({
      ...obj,
    }))
  } catch (e) {
    console.log(e)
  }
}
const fetchProduct = async (id) => {
  try {
    const { data } = await axios.get(`https://api.dev.cwe.su/api/products/${id}`)
    request.value = await data.data
    mainUrl.value = request.value.image
  } catch (e) {
    console.log(e)
  }
}
const fetchReviews = async (id) => {
  try {
    const { data } = await axios.get(`https://api.dev.cwe.su/api/reviews/?populate=*`)
    allReviews.value = await data.data

    productReviews.value = allReviews.value.filter((review) => review.product?.documentId == id)
    reviewsCount.value = productReviews.value.length
    if (reviewsCount.value > 0) {
      const sum = productReviews.value.reduce((sum, productReview) => {
        return sum + productReview.rate
      }, 0)

      const avg = sum / reviewsCount.value
      averageRating.value = Math.round(avg * 2) / 2
      console.log(allReviews.value)
      console.log(productReviews.value)
    } else {
      console.log('Нет отзывов')
    }
  } catch (e) {
    console.log(e)
  }
}
onMounted(async () => {
  await fetchProduct(route.params.id)
  await fetchSimilarItems()
  await fetchReviews(route.params.id)
})

const swapImages = () => {
  const temp = mainUrl.value
  mainUrl.value = additionalUrl.value
  additionalUrl.value = temp
  console.log(mainUrl, additionalUrl)
}
</script>
<template>
  <div class="shop-container container">
    <div class="product-container">
      <div class="product__content">
        <div class="product__images">
          <div v-if="request.additionalImages?.additionalImages?.[0]">
            <img
              v-for="(url, index) in Object.values(request.additionalImages.additionalImages[0])"
              :key="index"
              :src="url"
              alt="additionalImage"
              @click="
                () => {
                  additionalUrl = url
                  swapImages()
                }
              "
            />
          </div>
        </div>
        <div class="product__main-image" v-auto-animate>
          <img :src="mainUrl" alt="title" />
        </div>
        <div class="product__info">
          <div class="product__title">
            <h3>{{ request.title }}</h3>
            <p>{{ request.price }} $</p>
          </div>

          <div class="rate">
            <div class="stars">
              <template v-for="i in 5" :key="i">
                <img v-if="averageRating >= i" src="/img/star.svg" alt="full" class="star" />
                <img
                  v-else-if="averageRating >= i - 0.5"
                  src="/img/star-half.svg"
                  alt="half"
                  class="star"
                />
                <img v-else src="/img/star-outline.svg" alt="empty" class="star" />
              </template>
              <span class="rating-value">({{ averageRating }})</span>
            </div>
            <div class="review__text" v-if="reviewsCount">
              {{ reviewsCount }} customer
              <span v-if="reviewsCount === 1"> review </span>
              <span v-else>reviews</span>
            </div>
            <div class="review__text" v-else>No customer reviews</div>
          </div>
          <div class="description__text">
            {{ request.description }}
          </div>

          <div class="product__buttons">
            <div class="inrease">
              <button>-</button>
              {{ quantity }}
              <button>+</button>
            </div>
            <button class="add-button">add to cart</button>
          </div>
          <div class="additional-info">
            <img @click="toggleImage" :src="currentImage" alt="Add to favourites" />

            <div>
              <h2>SKU</h2>
              <em>12</em>
            </div>
            <div>
              <h2>Categoties:</h2>
              <em>Fashion, Style</em>
            </div>
          </div>
        </div>
      </div>
      <div class="description-tab">
        <div class="tab" :class="{ selected: activeTab === 1 }" @click="setActiveTab(1)">Description</div>
        <div class="tab" :class="{ selected: activeTab === 2 }" @click="setActiveTab(2)">Additional information</div>
        <div class="tab" :class="{ selected: activeTab === 3 }" @click="setActiveTab(3)">
          Reviews ({{ reviewsCount }})
        </div>
      </div>
      <div class="product__description" v-if="activeTab === 1">
        {{ request.description }}
      </div>
      <div class="product__description" v-if="activeTab === 2">
        <p><span class="description__category">Weight:</span> {{ request.weight }} kg</p>
        <p><span class="description__category">Dimentions:</span> {{ requestdimentions }} cm</p>
        <p><span class="description__category">Colours:</span> {{ request.color }}</p>
        <p><span class="description__category">Material:</span> {{ request.material }}</p>
      </div>
      <div class="product__description" v-if="activeTab === 3">
        <div v-if="reviewsCount != 0" v-for="productReview in productReviews">
          <p>
            <b>{{ productReview.author }}:</b> {{ productReview.text }}
          </p>
          <br />
        </div>
        <p v-else>No reviews</p>
      </div>
      <div class="similar-items">
        <h1>Similar items</h1>
        <div class="shop-items">
          <Card
            v-for="item in items"
            :key="item.id"
            :id="item.id"
            :imageUrl="item.image"
            :title="item.title"
            :price="item.price"
            :discountPercent="item.discountPercent"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
