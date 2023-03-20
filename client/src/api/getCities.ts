import axios from 'axios'

import {apiUrl} from './url'

export const getCities = async (): Promise<string[]> => {
  const response = await axios.get(`${apiUrl}/v1/cities`)
  const cities = await response.data
  return cities
}
