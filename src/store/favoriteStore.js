import {defineStore} from 'pinia'

export const useFavoriteStore = defineStore('favorites', {
  state: ()=>({
    favorites: []
  }),
  actions: {
    addFavorite (productId) {
      this.favorites.push(productId)
    },
    removeFavorite (productId) {
      this.favorites=this.favorites.filter(id => id !== productId)
    },
    toggleFavorite (productId) {
      if (this.favorites.includes(productId)) {
        this.removeFavorite(productId)
      }
      else {
        this.addFavorite(productId)
      }
    },
    isFavorite(productId) {
      return this.favorites.includes(productId)
    }
  },
  persist: true
})