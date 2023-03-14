import express, {Request} from 'express'
import {Event, EventModel} from './event-model'
const router = express.Router()
import axios from 'axios'

router.get('/', (req, res) => {
  res.send('Hello there')
})

type EventsRequestQueryParams = {
  category?: string
  timeframe: 'week' | 'today'
  city: string
  page?: number
  latitude?: number
  longitude?: number
}

const getCityFromCoordinates = async (coordinates: number[]): Promise<string | null> => {
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

let eventCityMap: {[id: string]: string | null} = {}

const preProcessEventLocations = async () => {
  const events: Event[] = await EventModel.find({})

  for (let event of events) {
    const city = await getCityFromCoordinates(event.location.coordinates)
    eventCityMap[event._id] = city
  }
}

preProcessEventLocations()

// Pretend current date
const currentDate = new Date('2022-11-28T02:00:00.000Z')

router.get('/v1/events', async (req: Request<{}, {}, {}, EventsRequestQueryParams>, res) => {
  const {category = 'popular', timeframe, city, page = 1, latitude, longitude} = req.query

  let events: Event[] = []

  if (timeframe == 'today') {
    // Get events on the same day
    const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
    const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59, 999)
    events = await EventModel.find({startUtc: {$gte: startOfDay, $lte: endOfDay}})
  } else if (timeframe == 'week') {
    // Get events within a week
    const endOfWeek = new Date(new Date(currentDate).setDate(currentDate.getDate() + 7))
    events = await EventModel.find({startUtc: {$gte: currentDate, $lte: endOfWeek}})
  }

  // Filter out events from different city
  if (city != 'near') {
    events = events.filter(event => eventCityMap[event._id] == city)
  }

  res.json(events)
})

export default router
