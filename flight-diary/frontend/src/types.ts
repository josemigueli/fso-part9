import { Dispatch, ReactNode } from 'react'

export interface EntryType {
  weather: string
  visibility: string
  date: string
  comment: string
  id: number
}

export type NewEntryType = Omit<EntryType, 'id'>

export type NotificationAction =
  | { type: 'SUCCESS'; payload: string }
  | { type: 'ERROR'; payload: string }
  | { type: 'CLEAR' }

export type NotificationState = {
  type: 'SUCCESS' | 'ERROR'
  payload: string
} | null

export type NotificationContextType =
  | [NotificationState, Dispatch<NotificationAction>]
  | null

export interface NotificationContextProviderProps {
  children: ReactNode
}

export type EntryState = EntryType[] | null

export type EntryAction = {
  type: 'SET'
  payload: EntryType[]
}

export type EntryContextType = [EntryState, Dispatch<EntryAction>] | null

export interface EntryContextProviderProps {
  children: ReactNode
}
