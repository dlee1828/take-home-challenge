import React, {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'

import './assets/stylesheets/styles.scss'
import '../src/assets/webfonts/Nunito/Nunito-Black.ttf'
import './App.scss'

import {getCities} from 'api/getCities'
import {apiUrl} from 'api/url'
import {Loader} from 'components/Loader'
import {CitySelection} from 'pages/CitySelection'
import {EventsDisplay} from 'pages/EventsDisplay'

const App = () => {
  const [cities, setCities] = useState<null | string[]>(null)

  useEffect(() => {
    const fetchCities = async () => {
      const response = await getCities()
      setCities(response)
    }
    fetchCities()
    console.log(process.env.NODE_ENV)
    console.log(apiUrl)
  }, [])

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const selectedCity = searchParams.get('city')

  if (!cities)
    return (
      <div className='LoadingScreen'>
        <Loader />
      </div>
    )

  return <div className='App'>{selectedCity ? <EventsDisplay /> : <CitySelection cities={cities} />}</div>
}

export default App
