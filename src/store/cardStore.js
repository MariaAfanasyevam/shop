import { defineStore } from 'pinia'
import axios from 'axios'
import { onMounted, reactive, ref, watch } from 'vue'
import debounce from 'lodash.debounce'
import { useCartStore } from './cartStore.js'
import { useFavoriteStore } from './favoriteStore.js'

export const useCardStore = defineStore('cardStore', () => {
  const items = ref([])
  const favorite = ref([])
  const sortBy = ref('')
  const searchQuery = ref('')

  const filters = reactive({
    sortBy: 'title',
    searchQuery: '',
    onSale: false,
    inStock: false,
  })
  const currentPage = ref(1)
  const pageSize = ref(24)
  const totalPages = ref(2)

  const onChangeSelect = (event) => {
    filters.sortBy = event.target.value
  }

  const onChangeSearchInput = debounce((value) => {
    filters.searchQuery = value
  }, 500)


  const searchByInputValue = (value) => {
    filters.searchQuery = value
    console.log(value)
    fetchItems()
  }
  const fetchItems = async () => {
    try {
      const params = {
        'pagination[page]': currentPage.value,
        'pagination[pageSize]': pageSize.value,
      }


      if (filters.sortBy) {
        params.sort = `${filters.sortBy}:asc`
      }
      if (filters.searchQuery) {
        params['filters[title][$containsi]'] = filters.searchQuery
      }
      if (filters.onSale) {
        params['filters[discountPercent][$gt]'] = 0
      }
      if (filters.inStock) {
        params['filters[itemsInStock][$gt]'] = 0
      }
      const { data } = await axios.get(`https://api.dev.cwe.su/api/products/?populate=*`, {
        params,
      })
      const result = data.data
      items.value = result.map((obj) => ({
        ...obj,
        quantity: 1,
      }))
      totalPages.value = data.meta.pagination.pageCount
    } catch (e) {
      console.log(e)
    }
  }

  const handleClick = (item) => {
    const favoriteStore = useFavoriteStore()
    favoriteStore.toggleFavorite(item)
  }
  const setPage = (page) => {
    currentPage.value = page
    fetchItems()
  }

  watch(filters, () => {
    currentPage.value = 1
    fetchItems()
  }, { deep: true })

  return {
    onChangeSelect,
    onChangeSearchInput,
    searchByInputValue,
    fetchItems,
    items,
    filters,
    sortBy,
    searchQuery,
    handleClick,
    currentPage,
    pageSize,
    totalPages,
    setPage,
  }
})
