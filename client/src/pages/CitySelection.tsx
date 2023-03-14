import React, {useEffect} from 'react'

import {getCities} from 'api/getCities'
import {EventsRequestQueryParams, getEvents} from 'api/getEvents'

export const CitySelection = () => {
  useEffect(() => {
    async function f() {
      const cities = await getCities()
      console.log('CITIES')
      console.log(cities)
    }
    f()
  }, [])
  return <div>City selection</div>
}
