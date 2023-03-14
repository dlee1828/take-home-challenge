import axios from 'axios'

export const getCities = async () => {
  const response = await axios.get('http://localhost:4000/v1/cities')
  const cities = await response.data
  return cities
}
