import { createContext, useReducer } from 'react'
import {
  NotificationAction,
  NotificationState,
  NotificationContextType,
  NotificationContextProviderProps,
} from './types'

const notificationReducer = (
  state: NotificationState,
  action: NotificationAction
): NotificationState => {
  switch (action.type) {
    case 'SUCCESS':
    case 'ERROR':
      return action
    case 'CLEAR':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext<NotificationContextType>(null)

export const NotificationContextProvider = ({
  children,
}: NotificationContextProviderProps) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  )

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
