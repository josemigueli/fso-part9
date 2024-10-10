import patientsData from '../../data/patients';
import { Patient, NoSsnField } from '../types';

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

export default {
  getNoSsnPatients,
};
