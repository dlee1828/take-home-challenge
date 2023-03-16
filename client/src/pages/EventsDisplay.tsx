import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'

import './EventsDisplay.scss'

import {Event, EventsRequestQueryParams, getEvents} from 'api/getEvents'
import {EventCard} from 'components/EventCard'

export const EventsDisplay = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const [events, setEvents] = useState<Event[] | null>(null)
  const navigate = useNavigate()
  const [selectedTime, setSelectedTime] = useState<'today' | 'week' | null>(null)

  useEffect(() => {
    const city = searchParams.get('city') ?? 'near'
    let time = searchParams.get('t')
    if (time != 'today') time = 'week'
    setSelectedTime(time as 'today' | 'week')

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
          <EventCard key={index} event={event}></EventCard>
        ))}
      </>
    )
  }

  return (
    <div className='EventsDisplay'>
      <video
        className='MainVideo'
        autoPlay
        muted
        loop={true}
        src='https://posh-b2.s3.us-east-2.amazonaws.com/meta+(1)_1.mp4'></video>
      <video
        className='BlurVideo'
        autoPlay
        muted
        loop={true}
        src='https://posh-b2.s3.us-east-2.amazonaws.com/meta+(1)_1.mp4'></video>
      <img
        src='https://posh-b2.s3.us-east-2.amazonaws.com/left-arrow-in-circular-button-black-symbol.svg'
        className='BackButton'
        onClick={() => navigate('/')}
      />
      <div className='TimeButtonsContainer'>
        <div className={`TimeButton ${selectedTime == 'week' ? 'selected' : ''}`} onClick={() => setTimeframe('week')}>
          This Week
        </div>
        <div
          className={`TimeButton ${selectedTime == 'today' ? 'selected' : ''}`}
          onClick={() => setTimeframe('today')}>
          Today
        </div>
      </div>
      <div className='EventCardsContainer'>{componentToDisplay}</div>
    </div>
  )
}
