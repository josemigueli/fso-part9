import { EntryType } from '../types'
import style from './Entry.module.css'

interface DataProps {
  data: EntryType
}

const Entry = ({ data }: DataProps) => {
  return (
    <div className={style.cardContainer}>
      <div className={style.mainInfoContainer}>
        <div>
          <h3 className={style.cardTitles}>Date</h3>
          <p className={style.cardParagraphs}>{data.date}</p>

          <h3 className={style.cardTitles}>Visibility</h3>
          <p className={style.cardParagraphs}>{data.visibility}</p>
        </div>
        <div>
          <h3 className={style.cardTitles}>Weather</h3>
          <p className={style.cardParagraphs}>{data.weather}</p>
        </div>
      </div>

      <h3 className={style.cardTitles}>Comment</h3>
      <p className={style.cardParagraphs}>{data.comment}</p>
    </div>
  )
}

export default Entry
