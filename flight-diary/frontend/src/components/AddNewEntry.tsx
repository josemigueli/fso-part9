import { useState, useRef } from 'react'
import { newEntry } from '../services/entryService'
import axios from 'axios'
import { useNotify } from '../functions'
import { useEntriesValue, useSetEntries } from '../functions'
import style from './AddNewEntry.module.css'

interface DataProps {
  show: boolean
  onClose: () => void
}

const AddNewEntry = ({ show, onClose }: DataProps) => {
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')
  const [closing, setClosing] = useState(false)
  const formRef = useRef<HTMLFormElement | null>(null)
  const notify = useNotify()
  const entries = useEntriesValue()
  const setEntries = useSetEntries()

  const selectVisibility = (value: string) => {
    setVisibility(value)
    const getRadio = document.getElementById(value) as HTMLInputElement | null
    if (getRadio) {
      getRadio.checked = true
    }
  }

  const selectWeather = (value: string) => {
    setWeather(value)
    const getRadio = document.getElementById(value) as HTMLInputElement | null
    if (getRadio) {
      getRadio.checked = true
    }
  }

  const closeForm = () => {
    setClosing(true)

    setTimeout(() => {
      onClose()
      setClosing(false)
    }, 400)
  }

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
        closeForm()
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          if (error.response?.data) {
            notify(error.response.data, 'ERROR')
          }
        }
      })
  }

  if (!show) {
    return null
  }

  return (
    <div className={style.modalContainer}>
      <div className={style.modalBackground} onClick={closeForm}></div>
      <div className={style.modalMain}>
        <div
          className={
            closing
              ? `${style.modalFormContainer} ${style.animateFadeOut}`
              : `${style.modalFormContainer} ${style.animateFadeIn}`
          }
        >
          <h2>Add New Entry</h2>
          <form onSubmit={addEntry} ref={formRef}>
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

            <div>
              <div className={style.divEntryForm}>
                <label htmlFor='visibility' className={style.labelEntryForm}>
                  Visibility
                </label>
                <div className={style.radioGrid}>
                  <div
                    className={
                      visibility !== 'great'
                        ? style.divRadio
                        : `${style.divRadio} ${style.selectedDivRadio}`
                    }
                    onClick={() => selectVisibility('great')}
                  >
                    <input type='radio' name='visibility' id='great' />
                    <label htmlFor='great'>Great</label>
                  </div>
                  <div
                    className={
                      visibility !== 'good'
                        ? style.divRadio
                        : `${style.divRadio} ${style.selectedDivRadio}`
                    }
                    onClick={() => selectVisibility('good')}
                  >
                    <input type='radio' name='visibility' id='good' />
                    <label htmlFor='good'>Good</label>
                  </div>
                  <div
                    className={
                      visibility !== 'ok'
                        ? style.divRadio
                        : `${style.divRadio} ${style.selectedDivRadio}`
                    }
                    onClick={() => selectVisibility('ok')}
                  >
                    <input type='radio' name='visibility' id='ok' />
                    <label htmlFor='okay'>Ok</label>
                  </div>
                  <div
                    className={
                      visibility !== 'poor'
                        ? style.divRadio
                        : `${style.divRadio} ${style.selectedDivRadio}`
                    }
                    onClick={() => selectVisibility('poor')}
                  >
                    <input type='radio' name='visibility' id='poor' />
                    <label htmlFor='poor'>Poor</label>
                  </div>
                </div>
              </div>

              <div className={style.divEntryForm}>
                <label htmlFor='weather' className={style.labelEntryForm}>
                  Weather
                </label>
                <div className={style.radioGrid}>
                  <div
                    className={
                      weather !== 'sunny'
                        ? style.divRadio
                        : `${style.divRadio} ${style.selectedDivRadio}`
                    }
                    onClick={() => selectWeather('sunny')}
                  >
                    <input type='radio' name='weather' id='sunny' />
                    <label htmlFor='sunny'>Sunny</label>
                  </div>
                  <div
                    className={
                      weather !== 'rainy'
                        ? style.divRadio
                        : `${style.divRadio} ${style.selectedDivRadio}`
                    }
                    onClick={() => selectWeather('rainy')}
                  >
                    <input type='radio' name='weather' id='rainy' />
                    <label htmlFor='rainy'>Rainy</label>
                  </div>
                  <div
                    className={
                      weather !== 'cloudy'
                        ? style.divRadio
                        : `${style.divRadio} ${style.selectedDivRadio}`
                    }
                    onClick={() => selectWeather('cloudy')}
                  >
                    <input type='radio' name='weather' id='cloudy' />
                    <label htmlFor='cloudy'>Cloudy</label>
                  </div>
                  <div
                    className={
                      weather !== 'stormy'
                        ? style.divRadio
                        : `${style.divRadio} ${style.selectedDivRadio}`
                    }
                    onClick={() => selectWeather('stormy')}
                  >
                    <input type='radio' name='weather' id='stormy' />
                    <label htmlFor='stormy'>Stormy</label>
                  </div>
                  <div
                    className={
                      weather !== 'windy'
                        ? style.divRadio
                        : `${style.divRadio} ${style.selectedDivRadio}`
                    }
                    onClick={() => selectWeather('windy')}
                  >
                    <input type='radio' name='weather' id='windy' />
                    <label htmlFor='windy'>Windy</label>
                  </div>
                </div>
              </div>
            </div>

            <div className={style.divEntryForm}>
              <label htmlFor='comment' className={style.labelEntryForm}>
                Comment
              </label>
              <textarea
                className={style.textAreaEntryForm}
                id='comment'
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                rows={6}
              />
            </div>

            <button type='submit' className={style.buttonEntryForm}>
              Add Entry
            </button>
            <button
              type='button'
              className={style.closeFormButton}
              onClick={closeForm}
            >
              Close
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddNewEntry
