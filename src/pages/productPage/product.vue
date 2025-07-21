<script setup>
import Card from '../../components/card.vue'
import { ref, watch, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useCardStore } from '../../store/cardStore'
import { useCartStore } from '../../store/cartStore'
import { useFavoriteStore } from '../../store/favoriteStore.js'
import heartIcon from '/img/heartIcon.svg'
import filledHeartIcon from '/img/filledHeartIcon.svg'
import { useProductStore } from '../../store/productStore'
import TabAdditional from '../../tabs/tab-additional.vue'
import TabReviews from '../../tabs/tab-reviews.vue'
import TabDescription from '../../tabs/tab-description.vue'
import shareIcon from '../../icons/share-icon.vue'
import arrowIcon from '../../icons/arrow-icon.vue'

const productStore = useProductStore()
const favoriteStore = useFavoriteStore()
const cartStore = useCartStore()
const cardStore = useCardStore()
const isExpanded = ref(false)

const route = useRoute()

const openTab = ref(null)

const toggleTab = (index) => {
  openTab.value = openTab.value === index ? null : index
}
const { quantity, mainUrl, additionalUrl, request, averageRating, reviewsCount, activeTab, similarItems } =
  storeToRefs(productStore)

const { fetchProduct, fetchSimilarItems, fetchReviews, setActiveTab } = productStore

const swapImages = productStore.swapImages

const fullText = computed(() => request.value?.description || '')

const truncatedText = computed(() => fullText.value.slice(0, 85) + '...')

const increaseQuantity = () => {
  quantity.value++
}

const decreaseQuantity = () => {
  if (quantity.value > 1) quantity.value--
}

const currentTabComponent = computed(() => {
  switch (activeTab.value) {
    case 1:
      return TabDescription
    case 2:
      return TabAdditional
    case 3:
      return TabReviews
    default:
      return TabDescription
  }
})

const tabs = [
  { title: 'Description', content: TabDescription },
  { title: 'Additional information', content: TabAdditional },
  { title: 'Reviews', content: TabReviews },
]
watch(
  () => route.params.id,
  async (newId) => {
    await fetchProduct(newId)
    await fetchReviews(newId)
    await fetchSimilarItems()
  },
  { immediate: true },
)
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
              @click="swapImages(url)"
            />
          </div>
        </div>
        <div class="product__main-image" v-auto-animate>
          <img :src="mainUrl" alt="title" @click="swapImages(additionalUrl)" />
        </div>
        <div class="product__info">
          <div class="product__info-block">
            <div class="product__title">
              <h3>{{ request.title }}</h3>
              <p>{{ request.price }} $</p>
            </div>
            <div class="share">
              <share-icon />
            </div>
          </div>

          <div class="rate">
            <div class="stars">
              <template v-for="i in 5" :key="i">
                <img v-if="averageRating >= i" src="/img/star.svg" alt="full" class="star" />
                <img v-else-if="averageRating >= i - 0.5" src="/img/star-half.svg" alt="half" class="star" />
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
            <div class="increase">
              <button @click="decreaseQuantity" :disabled="quantity <= 1">-</button>
              {{ quantity }}
              <button @click="increaseQuantity">+</button>
            </div>
            <button class="add-button" @click="cartStore.toggleCart(request)">
              {{ cartStore.isInCart(request) ? 'remove from cart' : 'add to cart' }}
            </button>
          </div>
          <div class="description-block">
            <p :class="['short-description', { expanded: isExpanded }]">
              {{ isExpanded ? fullText : truncatedText }}
            </p>
            <button class="view-more" :class="{ expanded: isExpanded }" @click="isExpanded = !isExpanded">
              {{ isExpanded ? 'View less' : 'View more' }}
              <span class="arrow"><arrow-icon /></span>
            </button>
          </div>
          <div class="additional-info">
            <img
              class="icon"
              @click="cardStore.handleClick(request.documentId)"
              :src="favoriteStore.favorites.includes(request.documentId) ? filledHeartIcon : heartIcon"
              alt="Add to favourites"
            />

            <div>
              <h2>SKU</h2>
              <em>12</em>
            </div>
            <div>
              <h2>Categories:</h2>
              <em>Fashion, Style</em>
            </div>
          </div>
        </div>
      </div>
      <div class="description-tab">
        <div class="tab-row">
          <div class="tab" v-for="(tab, index) in tabs" :key="index">
            <div class="tab-item" :class="{ selected: activeTab === index + 1 }" @click="setActiveTab(index + 1)">
              {{ tab.title }}
              <span v-if="index === 2">({{ reviewsCount }})</span>
            </div>
          </div>
        </div>

        <keep-alive>
          <component :is="currentTabComponent" />
        </keep-alive>
      </div>

      <div class="product-tabs">
        <div class="product-tab" v-for="(tab, index) in tabs" :key="index">
          <div class="tab-header" @click="toggleTab(index)">
            <span>{{ tab.title }}</span>
            <span class="arrow" :class="{ open: openTab === index }">▼</span>
          </div>
          <div v-show="openTab === index" class="tab-content">
            <component :is="tab.content" />
          </div>
        </div>
      </div>
      <div class="similar-items">
        <h1>Similar items</h1>
        <div class="shop-items">
          <Card
            v-for="item in similarItems"
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
      </div>
      <router-link to="/shop">
        <div class="continue">
          <div class="continue-block">Continue shopping</div>
          <div>
            <arrow-icon />
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style src="./product.scss" lang="scss" scoped></style>
