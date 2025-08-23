<script setup lang="ts">
import Card from '../../components/card/card.vue'
import { ref, watch, computed, h, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '../../store/cartStore'
import { useFavoriteStore } from '../../store/favoriteStore'
import heartIcon from '/img/heartIcon.svg'
import filledHeartIcon from '/img/filledHeartIcon.svg'
import TabAdditional from '../../tabs/tab-additional/tab-additional.vue'
import TabReviews from '../../tabs/tab-reviews/tab-reviews.vue'
import TabDescription from '../../tabs/tab-description/tab-description.vue'
import shareIcon from '../../icons/share-icon.vue'
import arrowIcon from '../../icons/arrow-icon.vue'
import { fetchProductApi, fetchReviewsApi, fetchSimilarItemsApi } from '../../api'

const route = useRoute()
const favoriteStore = useFavoriteStore()
const cartStore = useCartStore()
const isExpanded = ref<boolean>(false)
const openTab = ref<number|null>(null)
const similarItems = ref<SimilarItem[]>([])
const request = ref<Product|null>(null)
const quantity = ref<number>( 1);
const additionalUrl = ref<string>('')
const mainUrl = ref<string>('')
const allReviews = ref<Review[]>([])
const productReviews = ref<Review[]>([])
const averageRating = ref<number>(0)
const reviewsCount = ref<number>(0)
const activeTab = ref<number>(1)

interface ProductPageProps {
  id: string
}
const props = defineProps<ProductPageProps>()

const toggleTab = (index:number) => {
  openTab.value = openTab.value === index ? null : index
}

const fullText = computed<string>(() => request.value?.description || '')

const truncatedText = computed<string>(() => fullText.value.slice(0, 85) + '...')

const increaseQuantity = ():void => {
  quantity.value++
}

const decreaseQuantity = () :void => {
  if (quantity.value > 1) quantity.value--
}

const handleClick = (item: string):void => {
  const favoriteStore = useFavoriteStore()
  favoriteStore.toggleFavorite(item)
}

const onClick = (navigate:()=>void) => {
  navigate()
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, 100)
}

interface TabProps {
  Description: { productDescription: string }
  Additional: { productInformation: typeof information.value }
  Reviews: { productReviews: Review[]; title: string; id: string }
}

const currentTabComponent = computed<
    typeof TabDescription | typeof TabAdditional | typeof TabReviews
>(() => {
  switch (activeTab.value) {
    case 1: return TabDescription
    case 2: return TabAdditional
    case 3: return TabReviews
    default: return TabDescription
  }
})

interface Review {
  author: string,
  text: string,
  rate: number
}

interface SimilarItem {
  id: number,
  title: string,
  price: number,
  image: string,
  discountPercent?: number,
  documentId: string,
  itemsInStock: number,
}

interface Product{
  documentId: string,
  id: number,
  title: string,
  description: string,
  price: number,
  image: string,
  additionalImages?: {additionalImages: Record<string, string>[]},
  itemsInStock: number,
  weight?: number,
  color?: string,
  material?: string,
  discountPercent?: number
  quantity?: number
  dimensions?: string
}

interface ProductInformation {
  weight: number
  dimensions: string
  color: string
  material: string
}

const increaseIsDisabled = computed<boolean>(() => (quantity.value >= request.value.itemsInStock) || cartStore.isInCart(request.value))
const fetchReviews = async (id: string) :Promise<void> => {
  try {
    const { data } = await fetchReviewsApi(id)
    allReviews.value = data.data.reviews as Review[]
    productReviews.value = allReviews.value
    reviewsCount.value = productReviews.value.length
    if (reviewsCount.value > 0) {
      const sum = productReviews.value.reduce((total, r) => total + r.rate, 0)
      const avg = sum / reviewsCount.value
      averageRating.value = Math.round(avg * 2) / 2
    } else {
      averageRating.value = 0
    }
  } catch (e) {
    console.error('Error fetching reviews:', e)
  }
}

const information = computed<ProductInformation>(() => ({
  weight: Number(request.value?.weight??0),
  dimensions: request.value?.dimensions??'',
  color: request.value?.color??'',
  material: request.value?.material??'',
}))

const tabs = [
  { title: 'Description', content: () => h(TabDescription, { productDescription: request.value.description }) },
  { title: 'Additional information', content: () => h(TabAdditional, { productInformation: information.value }) },
  {
    title: 'Reviews',
    content: () => h(TabReviews, {
      productReviews: productReviews.value,
      title: request.value.title,
    id: String(props.id)
    }),
  },
]

const currentTabProps = computed<TabProps[keyof TabProps]>(() => {
  switch (activeTab.value) {
    case 1:
      return { productDescription: request.value.description }
    case 2:
      return { productInformation: information.value }
    case 3:
      return {
        productReviews: productReviews.value,
        title: request.value.title,
        id: request.value.documentId,
      }
    default:
      return { productDescription: request.value.description }
  }
})

const setActiveTab = (id:number): void => {
  activeTab.value = id
}

const fetchSimilarItems = async () => {
  try {
    const { data } = await fetchSimilarItemsApi()
    similarItems.value = data.data
  } catch (e) {
    console.error('Error fetching similar items:', e)
  }
}

const fetchProduct = async (id:string):Promise<void> => {
  try {
    const { data } = await fetchProductApi(id)
    const productData = data.data as Product
    request.value = {
      ...productData,
      quantity: 1,
    }
    mainUrl.value = request.value.image
  } catch (e) {
    console.error('Error fetching product:', e)
  }
}
const toggleProductInCart = (): void => {
  if (!request.value) return

  cartStore.toggleCart(
      {
        ...request.value,
        discountPercent: request.value.discountPercent ?? 0,
      },
      quantity.value
  )

  quantity.value = 1
  console.log(request.value)
}

const swapImages = (newUrl : string) :void => {
  additionalUrl.value = mainUrl.value
  mainUrl.value = newUrl
}
const scrollToTop = () :void => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
watch(
  () => route.params.id,
  async (newId) => {
    if (!newId) return
    const id = Array.isArray(newId) ? newId[0] : newId
    quantity.value = 1
    await fetchProduct(id)
    await fetchReviews(id)
    await fetchSimilarItems()
    await nextTick()
    scrollToTop()
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
              <button @click=" () => {
          if (quantity > 1) {
            quantity--;

          }
        }" :disabled="quantity <= 1">-</button>
              {{ quantity }}
              <button :disabled="increaseIsDisabled" @click="  () => {
          quantity++;

        }">+</button>
            </div>
            <button class="add-button" @click="toggleProductInCart">
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
              @click="handleClick(request.documentId)"
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
          <component
              :is="currentTabComponent"
              v-bind="currentTabProps"
          />
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
      <div class="gallery">
        <h1>Similar items</h1>
        <div class="gallery-container">

          <div class="similar-items">
            <Card
              class="similar-item"
              v-bind="$attrs"
              v-for="item in similarItems"
              :key="item.id"
              :id="item.id"
              :image="item.image"
              :title="item.title"
              :price="item.price"
              :discountPercent="item.discountPercent ?? 0"
              :documentId="item.documentId"
              :itemsInStock="item.itemsInStock"
            />
          </div>
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
