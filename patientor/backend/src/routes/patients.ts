import express from 'express';
import { Response } from 'express';
import patientsService from '../services/patientsService';
import { NoSsnField } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<NoSsnField[]>) => {
  res.send(patientsService.getNoSsnPatients());
});

export default router;
