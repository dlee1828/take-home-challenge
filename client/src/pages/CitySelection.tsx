import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'

import './CitySelection.scss'

import {getCities} from 'api/getCities'
import {EventsRequestQueryParams, getEvents} from 'api/getEvents'

export const CitySelection = (props: {cities: string[]}) => {
  const cities = props.cities
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const navigate = useNavigate()

  const handleClickedCity = (city: string) => {
    searchParams.set('city', city)
    searchParams.set('t', 'week')
    navigate(`?${searchParams.toString()}`)
  }

  return (
    <div className='CitySelection'>
      {cities.map(city => (
        <button onClick={() => handleClickedCity(city)} key={city}>
          {city}
        </button>
      ))}
    </div>
  )
}
