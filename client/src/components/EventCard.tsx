import React from 'react'

import './EventCard.scss'

import {Event} from 'api/getEvents'
import {useNavigate} from 'react-router-dom'

export const EventCard = (props: {event: Event}) => {
  const navigate = useNavigate()

  const event = props.event
  return (
    <div onClick={() => window.open(`https://posh.vip/e/${event.url}`, '_self')} className='EventCard'>
      <img className='Flyer' src={event.flyer}></img>
      {/* <div>{event.url}</div>
      <div>{event.groupAvi}</div>
      <div>{event.name}</div> */}
    </div>
  )
}
