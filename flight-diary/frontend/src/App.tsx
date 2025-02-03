import { useState } from 'react'
import Header from './components/Header'
import AddNewEntry from './components/AddNewEntry'
import Entries from './components/Entries'
import Notification from './components/Notification'
import style from './components/App.module.css'

function App() {
  const [showForm, setShowForm] = useState(false)
  const handleShow = () => {
    setShowForm(!showForm)
    if (!showForm) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
  return (
    <>
      <Notification />
      <Header />
      <div className={style.buttonContainer}>
        <button
          type='button'
          className={style.showFormButton}
          onClick={handleShow}
        >
          Add Entry
        </button>
      </div>
      <div className={style.content}>
        <AddNewEntry show={showForm} onClose={handleShow} />
        <Entries />
      </div>
    </>
  )
}

export default App
