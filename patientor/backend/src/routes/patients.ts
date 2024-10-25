import express, { Request, Response, NextFunction } from 'express';
import patientsService from '../services/patientsService';
import { NewPatient, NoSsnField, Patient, NewEntryType, Entry } from '../types';
import { newPatientSchema, validateNewEntryData } from '../utils';
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<NoSsnField[]>) => {
  res.send(patientsService.getNoSsnPatients());
});

router.get('/:id', (req, res: Response<Patient>) => {
  const patient = patientsService.findById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(400);
  }
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const data = validateNewEntryData(req.body);
    req.body = data;
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post(
  '/',
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientsService.addPatiente(req.body);
    res.json(addedPatient);
  }
);

router.post(
  '/:id/entries',
  newEntryParser,
  (
    req: Request<{ id: string }, unknown, NewEntryType>,
    res: Response<Entry | object>
  ) => {
    const addNewEntry = patientsService.addEntry(req.params.id, req.body);
    res.json(addNewEntry);
  }
);

router.use(errorMiddleware);

export default router;
