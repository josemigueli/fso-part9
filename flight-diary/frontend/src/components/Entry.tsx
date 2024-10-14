import { EntryType } from '../types'

interface DataProps {
  data: EntryType
}

const Entry = ({ data }: DataProps) => {
  return (
    <div>
      <p>Date: {data.date}</p>
      <p>Weather: {data.weather}</p>
      <p>Visibility: {data.visibility}</p>
      <p>Comment: {data.comment}</p>
    </div>
  )
}

export default Entry
