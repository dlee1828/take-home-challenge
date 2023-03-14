import React from 'react'
import {useLocation} from 'react-router-dom'

import './assets/stylesheets/styles.scss'
import '../src/assets/webfonts/Nunito/Nunito-Black.ttf'
import './App.scss'

import {CitySelection} from 'pages/CitySelection'
import {EventsDisplay} from 'pages/EventsDisplay'

const App = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const city = searchParams.get('city')
  let time = searchParams.get('t')
  if (time != 'today') time = 'week'

  return <div className='App'>{city ? <EventsDisplay time={time} city={city} /> : <CitySelection />}</div>
}

export default App
