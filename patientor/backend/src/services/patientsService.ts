import { v1 as uuid } from 'uuid';
import patientsData from '../../data/patients';
import { Patient, NoSsnField, NewPatient } from '../types';

const patients: Patient[] = patientsData;

const getNoSsnPatients = (): NoSsnField[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatiente = (data: NewPatient): Patient => {
  const id = uuid();
  const newPatient = {
    id: id,
    ...data
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getNoSsnPatients,
  addPatiente
};
