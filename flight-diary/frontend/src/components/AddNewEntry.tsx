import { useState, useRef } from 'react'
import { newEntry } from '../services/entryService'
import axios from 'axios'
import { useNotify } from '../functions'
import { useEntriesValue, useSetEntries } from '../functions'
import style from './AddNewEntry.module.css'

const AddNewEntry = () => {
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')
  const formRef = useRef<HTMLFormElement | null>(null)
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

        if (formRef.current) {
          formRef.current.reset()
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
      <form onSubmit={addEntry} className={style.entryForm} ref={formRef}>
        <div className={style.divEntryForm}>
          <label htmlFor='date' className={style.labelEntryForm}>
            Date
          </label>
          <input
            className={style.inputEntryForm}
            type='date'
            id='date'
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>

        <div className={style.visiAndWea}>
          <div className={style.divEntryForm}>
            <label htmlFor='visibility' className={style.labelEntryForm}>
              Visibility
            </label>
            <div className={style.divRadio}>
              <input
                type='radio'
                name='visibility'
                id='great'
                onChange={() => setVisibility('great')}
              />
              <label htmlFor='great'>Great</label>
            </div>
            <div className={style.divRadio}>
              <input
                type='radio'
                name='visibility'
                id='good'
                onChange={() => setVisibility('good')}
              />
              <label htmlFor='good'>Good</label>
            </div>
            <div className={style.divRadio}>
              <input
                type='radio'
                name='visibility'
                id='okay'
                onChange={() => setVisibility('ok')}
              />
              <label htmlFor='okay'>Ok</label>
            </div>
            <div className={style.divRadio}>
              <input
                type='radio'
                name='visibility'
                id='poor'
                onChange={() => setVisibility('poor')}
              />
              <label htmlFor='poor'>Poor</label>
            </div>
          </div>

          <div className={style.divEntryForm}>
            <label htmlFor='weather' className={style.labelEntryForm}>
              Weather
            </label>
            <div className={style.divRadio}>
              <input
                type='radio'
                name='weather'
                id='sunny'
                onChange={() => setWeather('sunny')}
              />
              <label htmlFor='sunny'>Sunny</label>
            </div>
            <div className={style.divRadio}>
              <input
                type='radio'
                name='weather'
                id='rainy'
                onChange={() => setWeather('rainy')}
              />
              <label htmlFor='rainy'>Rainy</label>
            </div>
            <div className={style.divRadio}>
              <input
                type='radio'
                name='weather'
                id='cloudy'
                onChange={() => setWeather('cloudy')}
              />
              <label htmlFor='cloudy'>Cloudy</label>
            </div>
            <div className={style.divRadio}>
              <input
                type='radio'
                name='weather'
                id='stormy'
                onChange={() => setWeather('stormy')}
              />
              <label htmlFor='stormy'>Stormy</label>
            </div>
            <div className={style.divRadio}>
              <input
                type='radio'
                name='weather'
                id='windy'
                onChange={() => setWeather('windy')}
              />
              <label htmlFor='windy'>Windy</label>
            </div>
          </div>
        </div>

        <div className={style.divEntryForm}>
          <label htmlFor='comment' className={style.labelEntryForm}>
            Comment
          </label>
          <input
            className={style.inputEntryForm}
            type='text'
            id='comment'
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>

        <button type='submit' className={style.buttonEntryForm}>
          Add
        </button>
      </form>
    </div>
  )
}

export default AddNewEntry
