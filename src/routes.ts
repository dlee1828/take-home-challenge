import express, {Request} from 'express'
import {Event, EventModel} from './event-model'
const router = express.Router()
import axios from 'axios'
import {getCityFromCoordinates} from './utils'

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

let eventCityMap: {[id: string]: string | null} = {}

const preProcessEventLocations = async () => {
  const events: Event[] = await EventModel.find({})

  for (let event of events) {
    const city = await getCityFromCoordinates(event.location.coordinates)
    eventCityMap[event._id] = city
  }
}

preProcessEventLocations()

router.get('/v1/cities', async (req, res) => {
  await preProcessEventLocations()
  // get unique cities from eventCityMap
  let cities: string[] = []
  for (let city of Object.values(eventCityMap)) {
    if (city && !cities.includes(city)) {
      cities.push(city)
    }
  }

  res.json(cities)
})

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
