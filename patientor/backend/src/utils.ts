import { z } from 'zod';
import { Gender, Diagnosis, HealthCheckRating } from './types';

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

export const parseDiagnosisCodes = (
  object: unknown
): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }
  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

export const healthCheckRatingSchema = z.nativeEnum(HealthCheckRating);

export const diagnosisCodesSchema = z.array(z.string()).optional();

export const baseEntrySchema = z.object({
  description: z.string().refine((d) => d.length > 0, {
    message: 'Description is required',
  }),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format',
  }),
  specialist: z.string().refine((d) => d.length > 0, {
    message: 'Specialist is required',
  }),
  diagnosisCodes: diagnosisCodesSchema,
});

const dischargeSchema = z.object({
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid discharge date',
  }),
  criteria: z.string().refine((d) => d.length > 0, {
    message: 'Criteria is required',
  }),
});

const sickLeaveSchema = z
  .object({
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid sick start date',
    }),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid sick end date',
    }),
  })
  .optional();

const hospitalEntrySchema = baseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: dischargeSchema,
});

const occupationalHealthcareEntrySchema = baseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string().refine((d) => d.length > 0, {
    message: 'Employer name is required',
  }),
  sickLeave: sickLeaveSchema,
});

const healthCheckEntrySchema = baseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: healthCheckRatingSchema,
});

export const entrySchema = z.union([
  hospitalEntrySchema,
  occupationalHealthcareEntrySchema,
  healthCheckEntrySchema,
]);

export const validateNewEntryData = (data: unknown) => {
  const result = entrySchema.safeParse(data);

  if (!result.success) {
    throw result.error;
  }

  const diagnosisCodes = parseDiagnosisCodes(data);

  return {
    ...result.data,
    diagnosisCodes,
  };
};
