import axios from 'axios'

export const fetchSliderItems = async () => {
  try {
    const response = await axios.get(`https://api.dev.cwe.su/api/promos/?populate=*`)
    return response.data.data
  } catch (e) {
    console.log(e)
  }
}

const BASE_URL = 'https://api.dev.cwe.su/api'

export const fetchProductApi = (id: string) => {
  return axios.get(`${BASE_URL}/products/${id}`)
}

export const fetchReviewsApi = (id: string) => {
  return axios.get(`${BASE_URL}/products/${id}/?populate=*`)
}

export const fetchSimilarItemsApi = () => {
  return axios.get(`${BASE_URL}/products/?pagination[pageSize]=3`)
}

export const fetchItems = async () => {
  return axios.get(`${BASE_URL}/products/?populate=*`)
}
