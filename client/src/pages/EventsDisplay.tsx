import React, {useEffect} from 'react'

import {EventsRequestQueryParams, getEvents} from 'api/getEvents'

export const EventsDisplay = (props: {time: string; city: string}) => {
  useEffect(() => {
    const params: EventsRequestQueryParams = {
      page: 1,
      city: 'Los Angeles',
      timeframe: 'week',
      category: 'popular',
    }
    getEvents(params)
  }, [])
  return <div>Events display</div>
}
