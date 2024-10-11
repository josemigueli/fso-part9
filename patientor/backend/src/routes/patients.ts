import express, { Request, Response, NextFunction} from 'express';
import patientsService from '../services/patientsService';
import { NewPatient, NoSsnField, Patient } from '../types';
import { newPatientSchema } from '../utils';
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<NoSsnField[]>) => {
  res.send(patientsService.getNoSsnPatients());
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body);
    console.log(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const addedPatient = patientsService.addPatiente(req.body);
  res.json(addedPatient);
});

router.use(errorMiddleware);

export default router;
