import Header from './components/Header'
import AddNewEntry from './components/AddNewEntry'
import Entries from './components/Entries'
import Notification from './components/Notification'

function App() {
  return (
    <>
      <Notification />
      <Header />
      <AddNewEntry />
      <Entries />
    </>
  )
}

export default App
