import Header from './components/Header'
import AddNewEntry from './components/AddNewEntry'
import Entries from './components/Entries'
import Notification from './components/Notification'
import style from './components/App.module.css'

function App() {
  return (
    <>
      <Notification />
      <Header />
      <div className={style.content}>
        <AddNewEntry />
        <Entries />
      </div>
    </>
  )
}

export default App
