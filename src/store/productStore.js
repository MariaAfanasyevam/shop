import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('products', {
  state: () => ({
    similarItems: [],
    request: {},
    imageUrls: [],
    quantity: 1,
    additionalUrl: '',
    mainUrl: '',
    allReviews: [],
    productReviews: [],
    averageRating: 0,
    reviewsCount: 0,
    activeTab: 1,

  }),

  actions: {
    setActiveTab(id) {
      this.activeTab = id
    },

    async fetchSimilarItems() {
      try {
        const { data } = await axios.get(`https://api.dev.cwe.su/api/products/?pagination[pageSize]=3`)
        this.similarItems = data.data.map((obj) => ({
          ...obj,
        }))
      } catch (e) {
        console.error('Error fetching similar items:', e)
      }
    },

    async fetchProduct(id) {
      try {
        const { data } = await axios.get(`https://api.dev.cwe.su/api/products/${id}`)
        const productData = data.data
        this.request = {
          ...productData,
          quantity: 1,
        }
        this.mainUrl = this.request.image
      } catch (e) {
        console.error('Error fetching product:', e)
      }
    },

    async fetchReviews(id) {
      try {
        const { data } = await axios.get(`https://api.dev.cwe.su/api/products/${id}/?populate=*`)
        this.allReviews = data.data.reviews
        console.log(data.data.reviews)
        this.productReviews = this.allReviews
        this.reviewsCount = this.productReviews.length

        if (this.reviewsCount > 0) {
          const sum = this.productReviews.reduce((total, r) => total + r.rate, 0)
          const avg = sum / this.reviewsCount
          this.averageRating = Math.round(avg * 2) / 2
        } else {
          this.averageRating = 0
        }

      } catch (e) {
        console.error('Error fetching reviews:', e)
      }
    },
    swapImages(newUrl) {
      this.additionalUrl = this.mainUrl
      this.mainUrl = newUrl

    },

    getters: {
      computedImageUrls: (state) => {
        const images = state.request?.additionalImages?.additionalImages
        if (images && typeof images === 'object') {
          const first = images[0]
          if (first && typeof first === 'object') {
            return Object.values(first)
          }
        }
        return []
      },
    },
  }
})
