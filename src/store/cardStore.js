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
  })


  const onChangeSelect = (event) => {
    filters.sortBy = event.target.value
  }

  const onChangeSearchInput = debounce((event) => {
    filters.searchQuery = event.target.value
  }, 500)

  const fetchItems = async () => {
    try {
      const params = {
        sortBy: filters.sortBy,
      }
      if (filters.searchQuery) {
        params.title = `*${filters.searchQuery}*`
      }
      const { data } = await axios.get(`https://api.dev.cwe.su/api/products/?populate=*`, {
        params,
      })
      const result = data.data
      items.value = result.map((obj) => ({
        ...obj,
        quantity: 1,
      }))
    } catch (e) {
      console.log(e)
    }
  }

  const handleClick = (item) => {
    const favoriteStore = useFavoriteStore()
    favoriteStore.toggleFavorite(item)
  }

  watch(filters, fetchItems)

  return {
    onChangeSelect,
    onChangeSearchInput,
    fetchItems,
    items,
    filters,
    sortBy,
    searchQuery,
    handleClick,
  }
})
