import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { NotificationContextProvider } from './NotificationContext.tsx'
import { EntryContextProvider } from './EntryContext.tsx'

createRoot(document.getElementById('root')!).render(
  <EntryContextProvider>
    <NotificationContextProvider>
      <App />
    </NotificationContextProvider>
  </EntryContextProvider>
)
