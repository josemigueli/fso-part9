import { useEffect } from 'react'
import Entry from './Entry'
import { getAllEntries } from '../services/entryService'
import { EntryType } from '../types'
import { useSetEntries, useEntriesValue } from '../functions'

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
    <div>
      <h2>All entries</h2>
      {entries.map((e) => (
        <Entry key={e.id} data={e} />
      ))}
    </div>
  )
}

export default Entries
