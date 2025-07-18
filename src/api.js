import axios from 'axios'

export const fetchSliderItems = async () => {
  try {
    const response = await axios.get(`https://api.dev.cwe.su/api/promos/?populate=*`)
    return response.data.data

  } catch (e) {
    console.log(e)
  }
}
