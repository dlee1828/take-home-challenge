import React, {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'

import './assets/stylesheets/styles.scss'
import '../src/assets/webfonts/Nunito/Nunito-Black.ttf'
import './App.scss'

import {getCities} from 'api/getCities'
import {CitySelection} from 'pages/CitySelection'
import {EventsDisplay} from 'pages/EventsDisplay'

const App = () => {
  const [cities, setCities] = useState<null | string[]>([])

  useEffect(() => {
    const fetchCities = async () => {
      const response = await getCities()
      setCities(response)
    }
    fetchCities()
  }, [])

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const selectedCity = searchParams.get('city')

  return <div className='App'>{selectedCity ? <EventsDisplay /> : <CitySelection cities={cities} />}</div>
}

export default App
