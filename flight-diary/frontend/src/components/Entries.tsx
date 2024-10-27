import { useEffect } from 'react'
import Entry from './Entry'
import { getAllEntries } from '../services/entryService'
import { EntryType } from '../types'
import { useSetEntries, useEntriesValue } from '../functions'
import style from './Entry.module.css'

const Entries = () => {
  const entries = useEntriesValue()
  const setEntries = useSetEntries()

  useEffect(() => {
    getAllEntries().then((data: EntryType[]) => {
      setEntries(data)
    })
  }, [])

  if (!entries) {
    return null
  }

  return (
    <div className={style.entriesContainer}>
      <h2>All entries</h2>
      <div className={style.containerOfCards}>
        {entries.map((e) => (
          <Entry key={e.id} data={e} />
        ))}
      </div>
    </div>
  )
}

export default Entries
