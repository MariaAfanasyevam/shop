import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useFavoriteStore = defineStore('favorites',
  ()=> {
    const favorites = ref([])

    function addFavorite(productId) {
      favorites.value.push(productId)
    }

    function removeFavorite(productId) {
      favorites.value = favorites.value.filter(id => id !== productId)
    }

    function toggleFavorite(productId) {
      if (favorites.value.includes(productId)) {
        removeFavorite(productId)
      } else {
        addFavorite(productId)
      }
    }

    function isFavorite(productId) {
      return favorites.value.includes(productId)
    }

    return {
      favorites,
      toggleFavorite,
      isFavorite
    }
  }, {
  persist: true
})