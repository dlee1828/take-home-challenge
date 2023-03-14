import axios from 'axios'

export const getCityFromCoordinates = async (coordinates: number[]): Promise<string | null> => {
  const lat = coordinates[1]
  const lng = coordinates[0]
  const api_key = process.env.GOOGLE_MAPS_API_KEY // Replace with your own API key

  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&result_type=locality&key=${api_key}`
  const response = await axios.get(url)
  const results = response.data.results
  if (response.data.status === 'OK') {
    for (const result of results) {
      for (const component of result.address_components) {
        if (component.types.includes('locality')) {
          return component.long_name
        }
      }
    }
  } else {
    console.log('Geocoding failed')
    return null
  }
  return null
}
