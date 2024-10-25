import axios from "axios";
import { Patient, PatientFormValues, NewEntry, Entry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const addNewEntry = async (object: NewEntry, id: string) => {
  const { data } = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, object);
  return data;
};

export default {
  getAll, getById, create, addNewEntry
};

