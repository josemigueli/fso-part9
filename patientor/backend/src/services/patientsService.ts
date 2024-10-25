import { v1 as uuid } from 'uuid';
import patientsData from '../../data/patients';
import { Patient, NoSsnField, NewPatient, NewEntryType, Entry } from '../types';

const patients: Patient[] = patientsData;

const getNoSsnPatients = (): NoSsnField[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.filter(p => {
    return p.id === id;
  });
  return patient[0];
};

const addPatiente = (data: NewPatient): Patient => {
  const id = uuid();
  const newPatient = {
    id: id,
    ...data,
    entries: []
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, data: NewEntryType): Entry | object => {
  const getPatient = findById(patientId);
  if (!getPatient) {
    return {
      "error": "No patient found"
    };
  }
  const id = uuid();
  const newEntry = {
    id: id,
    ...data
  };
  getPatient.entries.push(newEntry);
  return newEntry;
};

export default {
  getNoSsnPatients,
  findById,
  addPatiente,
  addEntry
};
