import style from './Global.module.css'

interface TotalProps {
  total: number
}

const Total = (props: TotalProps) => {
  return (
    <div className={style.cardContainer}>
      <h2 className={style.cardTitle}>Number of exercises: {props.total}</h2>
    </div>
  )
}

export default Total
