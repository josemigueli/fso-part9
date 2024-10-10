import express from 'express';
import { Response } from 'express';
import patientsService from '../services/patientsService';
import { NoSsnField } from '../types';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<NoSsnField[]>) => {
  res.send(patientsService.getNoSsnPatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatiente(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
