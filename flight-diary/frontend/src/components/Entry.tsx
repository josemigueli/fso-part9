import { EntryType } from '../types'
import style from './Entry.module.css'

interface DataProps {
  data: EntryType
}

const Entry = ({ data }: DataProps) => {
  return (
    <div className={style.cardContainer}>
      <h3>Date</h3>
      <p>{data.date}</p>
      <h3>Weather</h3>
      <p>{data.weather}</p>
      <h3>Visibility</h3>
      <p>{data.visibility}</p>
      <h3>Comment</h3>
      <p>{data.comment}</p>
    </div>
  )
}

export default Entry
