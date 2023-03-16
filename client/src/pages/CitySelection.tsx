import React from 'react'
import Confetti from 'react-confetti'
import {useLocation, useNavigate} from 'react-router-dom'

import './CitySelection.scss'

const cityEmojis = {
  'Los Angeles': String.fromCodePoint(0x2600),
  Miami: String.fromCodePoint(0x1f334),
  'New York': String.fromCodePoint(0x1f5fd),
}

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

  const getEmoji = (city: string) => {
    let emoji = cityEmojis[city as keyof typeof cityEmojis] ?? null
    if (emoji) emoji = emoji + ' '
    return emoji
  }

  return (
    <div className='CitySelection'>
      <Confetti colors={['#FFCC00']}></Confetti>
      <div className='Title'>WHERE ARE YOU LOOKING FOR EXPERIENCES?</div>
      <div className='CitiesContainer'>
        {cities.map(city => (
          <div className='CityOption' onClick={() => handleClickedCity(city)} key={city}>
            {`${getEmoji(city)}${city}`}
          </div>
        ))}
        <div className='CityOption Near' onClick={() => handleClickedCity('near')}>
          {`${String.fromCodePoint(0x1f4cd)} Near Me`}
        </div>
      </div>
    </div>
  )
}
