import {
  CoursePart,
  CoursePartBasic,
  CoursePartGroup,
  CoursePartBackground,
  CoursePartSpecial,
} from '../types'
import { assertNever } from '../utils'

interface PartProps {
  part: CoursePart
}

const Part = ({ part }: PartProps) => {
  const coursePartBasic = (data: CoursePartBasic) => (
    <div>
      <b>
        <p>
          {data.name} {data.exerciseCount}
        </p>
      </b>
      <p>{data.description}</p>
    </div>
  )

  const coursePartGroup = (data: CoursePartGroup) => (
    <div>
      <b>
        <p>
          {data.name} {data.exerciseCount}
        </p>
      </b>
      <p>Project exercises {data.groupProjectCount}</p>
    </div>
  )

  const coursePartBackground = (data: CoursePartBackground) => (
    <div>
      <b>
        <p>
          {data.name} {data.exerciseCount}
        </p>
      </b>
      <p>{data.description}</p>
      <p>{data.backgroundMaterial}</p>
    </div>
  )

  const coursePartSpecial = (data: CoursePartSpecial) => (
    <div>
      <b>
        <p>
          {data.name} {data.exerciseCount}
        </p>
      </b>
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
