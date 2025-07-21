import { defineStore } from 'pinia'
import axios from 'axios'
import { computed, ref } from 'vue'

export const useProductStore = defineStore('products', () => {
  const similarItems = ref([])
  const request = ref({})
  const imageUrls = ref([])
  const quantity = ref(1)
  const additionalUrl = ref('')
  const mainUrl = ref('')
  const allReviews = ref([])
  const productReviews = ref([])
  const averageRating = ref(0)
  const reviewsCount = ref(0)
  const activeTab = ref(1)

  const setActiveTab = (id) => {
    activeTab.value = id
  }

  const computedImageUrls = computed(() => {
    const images = request.value?.additionalImages?.additionalImages
    if (images && typeof images === 'object') {
      const first = images[0]
      if (first && typeof first === 'object') {
        return Object.values(first)
      }
    }
    return []
  })

  const fetchSimilarItems = async () => {
    try {
      const { data } = await axios.get(`https://api.dev.cwe.su/api/products/?pagination[pageSize]=3`)
      similarItems.value = data.data.map((obj) => ({
        ...obj,
      }))
    } catch (e) {
      console.error('Error fetching similar items:', e)
    }
  }

  const fetchProduct = async (id) => {
    try {
      const { data } = await axios.get(`https://api.dev.cwe.su/api/products/${id}`)
      const productData = data.data
      request.value = {
        ...productData,
        quantity: 1,
      }
      mainUrl.value = request.value.image
    } catch (e) {
      console.error('Error fetching product:', e)
    }
  }

  const fetchReviews = async (id) => {
    try {
      const { data } = await axios.get(`https://api.dev.cwe.su/api/products/${id}/?populate=*`)
      allReviews.value = data.data.reviews
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

  const swapImages = (newUrl) => {
    additionalUrl.value = mainUrl.value
    mainUrl.value = newUrl
  }

  return {
    similarItems,
    request,
    imageUrls,
    quantity,
    additionalUrl,
    mainUrl,
    allReviews,
    productReviews,
    averageRating,
    reviewsCount,
    activeTab,
    setActiveTab,
    computedImageUrls,
    fetchSimilarItems,
    fetchReviews,
    swapImages,
    fetchProduct,
  }
})
