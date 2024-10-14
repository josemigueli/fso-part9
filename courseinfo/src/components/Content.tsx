import Part from './Part'
import { CoursePart } from '../types'

interface ContentProps {
  courseData: CoursePart[]
}

const Content = ({ courseData }: ContentProps) => {
  return (
    <div>
      {courseData.map((p) => (
        <Part key={p.name} part={p} />
      ))}
    </div>
  )
}

export default Content
