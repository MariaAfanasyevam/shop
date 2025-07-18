import { defineStore } from 'pinia'
import { ref } from 'vue'
import {useCardStore} from './cardStore.js'


export const useFilterStore = defineStore('filterStore', () => {

  const filterOpen = ref(false)

  const filterMenuOpen = () => {
    filterOpen.value = true
    const cardStore = useCardStore()
    cardStore.filters.sortBy = 'title'
    cardStore.filters.searchQuery = ''
    cardStore.filters.onSale = false
    cardStore.filters.inStock = false
  }
  const closeFilterMenu = () => {
    filterOpen.value = false
  }
  const resetAndCloseFilters = () => {
    const cardStore = useCardStore()
    cardStore.filters.sortBy = 'title'
    cardStore.filters.searchQuery = ''
    cardStore.filters.onSale = false
    cardStore.filters.inStock = false
    cardStore.fetchItems()

    closeFilterMenu()
  }
  return {
    filterOpen,
    filterMenuOpen,
    closeFilterMenu,
    resetAndCloseFilters
  }
})