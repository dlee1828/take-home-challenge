import axios from 'axios'

export interface Event {
  name: string
  flyer: string
  groupAvi: string
  timezone: string
  startUtc: Date
  endUtc: Date
  url: string
  venueName: string
  groupName: string
  location: {
    coordinates: number[]
  }
}

export type EventsRequestQueryParams = {
  category?: string
  timeframe: 'week' | 'today'
  city: string
  page?: number
  latitude?: number
  longitude?: number
}

export const getEvents = async (params: EventsRequestQueryParams) => {
  const response: Event[] = (await axios.get('http://localhost:4000/v1/events', {params})).data
  return response
}
