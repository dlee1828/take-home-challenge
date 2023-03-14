import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'

import './EventsDisplay.scss'

import {Event, EventsRequestQueryParams, getEvents} from 'api/getEvents'

export const EventsDisplay = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const [events, setEvents] = useState<Event[] | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const city = searchParams.get('city') ?? 'near'
    let time = searchParams.get('t')
    if (time != 'today') time = 'week'

    const params: EventsRequestQueryParams = {
      page: 1,
      city: city!,
      timeframe: time as 'week' | 'today',
      category: 'popular',
    }

    const func = async () => {
      const res = await getEvents(params)
      setEvents(res)
    }
    func()
  }, [location.search])

  const setTimeframe = (timeframe: 'today' | 'week') => {
    searchParams.set('t', timeframe)
    navigate(`?${searchParams.toString()}`)
  }

  let componentToDisplay = null

  if (events == null) {
    componentToDisplay = <div style={{textAlign: 'center'}}>Loading events</div>
  } else if (events.length == 0) {
    componentToDisplay = <div style={{textAlign: 'center'}}>No Events</div>
  } else {
    componentToDisplay = (
      <>
        {events.map((event, index) => (
          <div key={index}>{event.name}</div>
        ))}
      </>
    )
  }

  return (
    <div className='EventsDisplay'>
      <button onClick={() => navigate('/')}>Go back</button>
      <button onClick={() => setTimeframe('week')}>This Week</button>
      <button onClick={() => setTimeframe('today')}>Today</button>
      {componentToDisplay}
    </div>
  )
}
