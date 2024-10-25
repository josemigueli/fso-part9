export interface Diagnosis {
  code: string
  name: string
  latin?: string
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface BaseEntry {
  id: string
  description: string
  date: string
  specialist: string
  diagnosisCodes?: Array<Diagnosis['code']>
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

export interface DischargeType {
  [date: string]: string
  criteria: string
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital'
  discharge: DischargeType
}

export interface SickLeaveType {
  startDate: string
  endDate: string
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare'
  employerName: string
  sickLeave?: SickLeaveType
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck'
  healthCheckRating: HealthCheckRating
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export enum EntryTypes {
  Hospital = 'Hospital',
  HealthCheck = 'Health Check',
  OccupationalHealthcare = 'Occupational Healthcare',
}

export interface Patient {
  id: string
  name: string
  occupation: string
  gender: Gender
  ssn?: string
  dateOfBirth?: string
  entries: Entry[]
}

export interface NewEntryData {
  date: string
  specialist: string
  description: string
  employerName: string
  healthCheckRating: string
}

export interface NestedDataType {
  dischargeDate: string
  criteria: string
  startDate: string
  endDate: string
}

export interface MapErrorType {
  code: string
  message: string
  path: string[]
}

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export type NewEntry = UnionOmit<Entry, 'id'>;

export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;

export type BaseEntryWithoutId = Omit<BaseEntry, 'id'>;
