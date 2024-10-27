import {
  CoursePart,
  CoursePartBasic,
  CoursePartGroup,
  CoursePartBackground,
  CoursePartSpecial,
} from '../types'
import { assertNever } from '../utils'
import style from './Global.module.css'

interface PartProps {
  part: CoursePart
}

const Part = ({ part }: PartProps) => {
  const coursePartBasic = (data: CoursePartBasic) => (
    <div className={style.cardContainer}>
      <h2 className={style.cardTitle}>
        {data.name} - {data.exerciseCount} exercises
      </h2>
      <p>{data.description}</p>
    </div>
  )

  const coursePartGroup = (data: CoursePartGroup) => (
    <div className={style.cardContainer}>
      <h2 className={style.cardTitle}>
        {data.name} - {data.exerciseCount} exercises
      </h2>
      <p>Project exercises {data.groupProjectCount}</p>
    </div>
  )

  const coursePartBackground = (data: CoursePartBackground) => (
    <div className={style.cardContainer}>
      <h2 className={style.cardTitle}>
        {data.name} - {data.exerciseCount} exercises
      </h2>
      <p>{data.description}</p>
      <p>{data.backgroundMaterial}</p>
    </div>
  )

  const coursePartSpecial = (data: CoursePartSpecial) => (
    <div className={style.cardContainer}>
      <h2 className={style.cardTitle}>
        {data.name} - {data.exerciseCount} exercises
      </h2>
      <p>{data.description}</p>
      <p>Required skills</p>
      <ul>
        {data.requirements.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
    </div>
  )

  switch (part.kind) {
    case 'basic':
      return coursePartBasic(part)
    case 'group':
      return coursePartGroup(part)
    case 'background':
      return coursePartBackground(part)
    case 'special':
      return coursePartSpecial(part)
    default:
      return assertNever(part)
  }
}

export default Part
