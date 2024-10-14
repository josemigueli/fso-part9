import { useContext } from 'react'
import NotificationContext from './NotificationContext'
import EntryContext from './EntryContext'
import { NotificationState, EntryType, EntryState } from './types'

export const useNotificationValue = (): NotificationState => {
  const notificationAndDispatch = useContext(NotificationContext)
  if (!notificationAndDispatch) {
    throw new Error(
      'useNotificationValue must be used within a NotificationContextProvider'
    )
  }
  return notificationAndDispatch[0]
}

export const useNotify = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  if (!notificationAndDispatch) {
    throw new Error(
      'useNotify must be used within a NotificationContextProvider'
    )
  }
  const dispatch = notificationAndDispatch[1]
  return (
    payload: string,
    type: 'SUCCESS' | 'ERROR' = 'SUCCESS',
    time: number = 5
  ) => {
    dispatch({ type, payload })
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, time * 1000)
  }
}

export const useEntriesValue = (): EntryState => {
  const entriesAndDispatch = useContext(EntryContext)
  if (!entriesAndDispatch) {
    throw new Error(
      'useEntriesValue must be used within a NotificationContextProvider'
    )
  }
  return entriesAndDispatch[0]
}

export const useSetEntries = () => {
  const entriesAndDispatch = useContext(EntryContext)
  if (!entriesAndDispatch) {
    throw new Error(
      'useNotify must be used within a NotificationContextProvider'
    )
  }
  const dispatch = entriesAndDispatch[1]
  return (payload: EntryType[]) => {
    dispatch({ type: 'SET', payload })
  }
}
