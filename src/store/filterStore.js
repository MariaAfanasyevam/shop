import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCardStore } from './cardStore.js'

export const useFilterStore = defineStore('filterStore', () => {
  const filterOpen = ref(false)
  const defaultFilters = {
    sortBy: 'title',
    searchQuery: '',
    onSale: false,
    inStock: false,
  }
  const filterMenuOpen = () => {
    filterOpen.value = true

  }
  const closeFilterMenu = () => {
    filterOpen.value = false
  }
  const resetAndCloseFilters = () => {
    const cardStore = useCardStore()
    Object.assign(cardStore.filters, defaultFilters)
    cardStore.fetchItems()

    closeFilterMenu()
  }
  return {
    filterOpen,
    filterMenuOpen,
    closeFilterMenu,
    resetAndCloseFilters,
  }
})
