import style from './Global.module.css'

interface HeaderProps {
  name: string
}

const Header = (props: HeaderProps) => {
  return (
    <div>
      <h1 className={style.title}>{props.name}</h1>
    </div>
  )
}

export default Header
