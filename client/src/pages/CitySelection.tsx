import {EventsRequestQueryParams, getEvents} from 'api/getEvents'
import React, {useEffect} from 'react'

export const CitySelection = () => {
  useEffect(() => {
    const params: EventsRequestQueryParams = {
      page: 1,
      city: 'Los Angeles',
      timeframe: 'week',
      category: 'popular',
    }
    getEvents(params)
  }, [])
  return <div>City selection</div>
}
