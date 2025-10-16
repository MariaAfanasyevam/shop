import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFavoriteStore = defineStore(
  'favorites',
  () => {
    const favorites = ref<string[]>([])

    function addFavorite(productId:string) {
      favorites.value.push(productId)
    }

    function removeFavorite(productId:string) {
      favorites.value = favorites.value.filter((id) => id !== productId)
    }

    function toggleFavorite(productId:string) {
      if (favorites.value.includes(productId)) {
        removeFavorite(productId)
      } else {
        addFavorite(productId)
      }
    }

    function isFavorite(productId:string) {
      return favorites.value.includes(productId)
    }

    return {
      favorites,
      toggleFavorite,
      isFavorite,
    }
  },
  {
    persist: true,
  },
)
