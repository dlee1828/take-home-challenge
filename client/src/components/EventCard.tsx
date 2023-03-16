import React, {useEffect} from 'react'

import './EventCard.scss'

import {Event} from 'api/getEvents'
import {getAbbreviatedDayFromDate} from 'utils/utils'

export const EventCard = (props: {event: Event}) => {
  const event = props.event
  return (
    <div
      style={{backgroundImage: `url(${event.flyer})`}}
      onClick={() => window.open(`https://posh.vip/e/${event.url}`, '_self')}
      className='EventCard'>
      <div className='Filter' />
      <div className='BottomSection'>
        <div className='Day'>{getAbbreviatedDayFromDate(new Date(event.startUtc))}</div>
        <div className='VerticalLine' />
        <div className='Names'>
          <div className='EventName'>{event.name}</div>
          <div className='GroupName'>{event.groupName}</div>
        </div>
      </div>
      <img className='GroupAvi' src={event.groupAvi} />
    </div>
  )
}
