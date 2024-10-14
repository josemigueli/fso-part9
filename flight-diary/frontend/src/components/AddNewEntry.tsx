import { useState } from 'react'
import { newEntry } from '../services/entryService'
import axios from 'axios'
import { useNotify } from '../functions'
import { useEntriesValue, useSetEntries } from '../functions'

const AddNewEntry = () => {
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')
  const notify = useNotify()
  const entries = useEntriesValue()
  const setEntries = useSetEntries()

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault()
    newEntry({
      date,
      visibility,
      weather,
      comment,
    })
      .then((data) => {
        if (entries) {
          setEntries(entries.concat(data))
        }

        setDate('')
        setVisibility('')
        setWeather('')
        setComment('')
        notify('Entry added!')
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          if (error.response?.data) {
            notify(error.response.data, 'ERROR')
          }
        }
      })
  }
  return (
    <div>
      <h2>Add New Entry</h2>
      <form onSubmit={addEntry}>
        <div>
          <label htmlFor='date'>Date</label>
          <input
            type='date'
            id='date'
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor='visibility'>Visibility</label>
          Great
          <input
            type='radio'
            name='visibility'
            onChange={() => setVisibility('great')}
          />
          Good
          <input
            type='radio'
            name='visibility'
            onChange={() => setVisibility('good')}
          />
          Ok
          <input
            type='radio'
            name='visibility'
            onChange={() => setVisibility('ok')}
          />
          Poor
          <input
            type='radio'
            name='visibility'
            onChange={() => setVisibility('poor')}
          />
        </div>

        <div>
          <label htmlFor='weather'>Weather</label>
          Sunny
          <input
            type='radio'
            name='weather'
            onChange={() => setWeather('sunny')}
          />
          Rainy
          <input
            type='radio'
            name='weather'
            onChange={() => setWeather('rainy')}
          />
          Cloudy
          <input
            type='radio'
            name='weather'
            onChange={() => setWeather('cloudy')}
          />
          Stormy
          <input
            type='radio'
            name='weather'
            onChange={() => setWeather('stormy')}
          />
          Windy
          <input
            type='radio'
            name='weather'
            onChange={() => setWeather('windy')}
          />
        </div>

        <div>
          <label htmlFor='comment'>Comment</label>
          <input
            type='text'
            id='comment'
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>

        <button type='submit'>Add</button>
      </form>
    </div>
  )
}

export default AddNewEntry
