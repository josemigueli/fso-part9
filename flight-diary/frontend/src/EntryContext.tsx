import { createContext, useReducer } from 'react'
import {
  EntryAction,
  EntryState,
  EntryContextType,
  EntryContextProviderProps,
} from './types'

const entryReducer = (state: EntryState, action: EntryAction) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    default:
      return state
  }
}

const EntryContext = createContext<EntryContextType>(null)

export const EntryContextProvider = ({
  children,
}: EntryContextProviderProps) => {
  const [entries, entriesDispatch] = useReducer(entryReducer, null)

  return (
    <EntryContext.Provider value={[entries, entriesDispatch]}>
      {children}
    </EntryContext.Provider>
  )
}

export default EntryContext
