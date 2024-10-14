import axios from 'axios'
import { EntryType, NewEntryType } from '../types'

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllEntries = async () => {
  const res = await axios.get<EntryType[]>(baseUrl)
  return res.data
}

export const newEntry = async (object: NewEntryType) => {
  const res = await axios.post(baseUrl, object)
  return res.data
}
