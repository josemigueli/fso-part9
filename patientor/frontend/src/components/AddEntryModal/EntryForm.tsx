import { useState, ChangeEvent } from 'react';
import React from 'react';
import {
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Button,
  SelectChangeEvent,
  Input,
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel,
} from '@mui/material';
import {
  HealthCheckRating,
  Diagnosis,
  NewEntryData,
  EntryTypes,
  NestedDataType,
  NewEntry,
  BaseEntryWithoutId,
  MapErrorType,
  Entry,
} from '../../types';
import patientsService from '../../services/patients';
import axios from 'axios';

interface EntryFormType {
  onClose: () => void
  diagnosis: Diagnosis[]
  patientId: string
  error: (s: string) => void
  onData: (d: Entry) => void
}

const EntryForm = ({
  onClose,
  diagnosis,
  patientId,
  error,
  onData,
}: EntryFormType) => {
  const [typeForm, setTypeForm] = useState<string>('Hospital');
  const [dCodes, setDCodes] = React.useState<string[]>([]);
  const [data, setData] = useState<NewEntryData>({
    date: '',
    specialist: '',
    description: '',
    employerName: '',
    healthCheckRating: '',
  });
  const { date, specialist, description, employerName, healthCheckRating } =
    data;

  const [nestedData, setNestedData] = useState<NestedDataType>({
    dischargeDate: '',
    criteria: '',
    startDate: '',
    endDate: '',
  });
  const { dischargeDate, criteria, startDate, endDate } = nestedData;

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const onChangeNested = (e: ChangeEvent<HTMLInputElement>) =>
    setNestedData({ ...nestedData, [e.target.name]: e.target.value });

  const showDischarge = () => (
    <>
      <Typography variant='body1'>Discharge</Typography>
      <FormControl fullWidth style={{ marginBottom: '1em' }}>
        <Typography variant='body2'>Date</Typography>
        <Input
          type='date'
          name='dischargeDate'
          value={dischargeDate}
          onChange={onChangeNested}
        />
      </FormControl>

      <TextField
        label='Criteria'
        name='criteria'
        value={criteria}
        onChange={onChangeNested}
        fullWidth
        style={{ marginBottom: '1em' }}
      />
    </>
  );

  const rating = () => {
    const ratings = Object.values(HealthCheckRating)
      .filter((v) => isNaN(Number(v)))
      .map((v, i) => ({ label: v, value: i }));
    return (
      <>
        <FormControl style={{ marginBottom: '1em' }}>
          <FormLabel id='health-rating'>Health Rating</FormLabel>
          <RadioGroup
            name='healthCheckRating'
            row
            value={healthCheckRating}
            onChange={onChange}
          >
            {ratings.map((r, i) => (
              <FormControlLabel
                key={i}
                value={r.value}
                control={<Radio />}
                label={r.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </>
    );
  };

  const occupational = () => (
    <>
      <TextField
        label='Employer Name'
        name='employerName'
        fullWidth
        value={employerName}
        style={{ marginBottom: '1em' }}
        onChange={onChange}
      />
      <Typography variant='body1'>Sick Leave</Typography>
      <FormControl fullWidth style={{ marginBottom: '1em' }}>
        <Typography variant='body2'>Start Date</Typography>
        <Input
          type='date'
          name='startDate'
          value={startDate}
          onChange={onChangeNested}
        />
      </FormControl>
      <FormControl fullWidth style={{ marginBottom: '1em' }}>
        <Typography variant='body2'>End Date</Typography>
        <Input
          type='date'
          name='endDate'
          value={endDate}
          onChange={onChangeNested}
        />
      </FormControl>
    </>
  );

  const handleDiagnosis = (event: SelectChangeEvent<typeof dCodes>) => {
    const value = event.target.value;
    setDCodes(typeof value === 'string' ? value.split(',') : value);
  };

  const sumbit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const basic: BaseEntryWithoutId = {
      date,
      specialist,
      description,
      diagnosisCodes: dCodes,
    };

    if (dCodes.length < 1) {
      delete basic.diagnosisCodes;
    }

    const hospitalData: NewEntry = {
      ...basic,
      type: 'Hospital',
      discharge: {
        date: dischargeDate,
        criteria,
      },
    };

    const healthCheckData: NewEntry = {
      ...basic,
      type: 'HealthCheck',
      healthCheckRating: parseInt(healthCheckRating),
    };

    const occupationalHealthcareData: NewEntry = {
      ...basic,
      type: 'OccupationalHealthcare',
      employerName,
      sickLeave: {
        startDate,
        endDate,
      },
    };

    if (startDate.length < 1 && endDate.length < 1) {
      delete occupationalHealthcareData.sickLeave;
    }

    const onSuccess = (data: Entry) => {
      onData(data);
      onClose();
    };

    const handleError = (e: unknown) => {
      if (axios.isAxiosError(e)) {
        if (e.response?.data) {
          const issues = e.response.data.error
            .map((e: MapErrorType) => e.message)
            .join(' | ');
          error(`Error: ${issues}`);
          return;
        }
      }
      error('Something went wrong');
    };

    switch (typeForm) {
      case EntryTypes.Hospital:
        patientsService
          .addNewEntry(hospitalData, patientId)
          .then((d) => {
            onSuccess(d);
          })
          .catch((e) => {
            handleError(e);
          });
        return;
      case EntryTypes.HealthCheck:
        patientsService
          .addNewEntry(healthCheckData, patientId)
          .then((d) => {
            onSuccess(d);
          })
          .catch((e) => {
            handleError(e);
          });
        return;
      case EntryTypes.OccupationalHealthcare:
        patientsService
          .addNewEntry(occupationalHealthcareData, patientId)
          .then((d) => {
            onSuccess(d);
          })
          .catch((e) => {
            handleError(e);
          });
        return;
      default:
        return;
    }
  };
  return (
    <div>
      <FormControl fullWidth style={{ marginBottom: '1em' }}>
        <InputLabel id='entry-type'>Entry type</InputLabel>
        <Select
          labelId='entry-type'
          label='Entry type'
          value={typeForm}
          onChange={({ target }) => setTypeForm(target.value)}
        >
          {Object.values(EntryTypes).map((e, i) => (
            <MenuItem key={i} value={e}>
              {e}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography variant='h6' style={{ marginBottom: '0.5em' }}>
        New {typeForm} Entry
      </Typography>

      <form onSubmit={sumbit}>
        <FormControl fullWidth style={{ marginBottom: '1em' }}>
          <Typography variant='body2'>Date</Typography>
          <Input type='date' name='date' value={date} onChange={onChange} />
        </FormControl>
        <TextField
          label='Specialist'
          fullWidth
          style={{ marginBottom: '1em' }}
          value={specialist}
          name='specialist'
          onChange={onChange}
        />
        <TextField
          label='Description'
          name='description'
          value={description}
          fullWidth
          style={{ marginBottom: '1em' }}
          onChange={onChange}
        />

        <FormControl fullWidth style={{ marginBottom: '1em' }}>
          <InputLabel id='diagnosis-codes'>Diagnosis Codes</InputLabel>
          <Select
            labelId='diagnosis-codes'
            label='Diagnosis Codes'
            multiple
            value={dCodes}
            onChange={handleDiagnosis}
          >
            {diagnosis.map((d, i) => (
              <MenuItem key={i} value={d.code}>
                {d.code} {d.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {typeForm === EntryTypes.Hospital ? showDischarge() : null}

        {typeForm === EntryTypes.HealthCheck ? rating() : null}

        {typeForm === EntryTypes.OccupationalHealthcare ? occupational() : null}

        <Grid style={{ paddingBottom: '3em' }}>
          <Grid item>
            <Button
              color='error'
              variant='contained'
              style={{ float: 'left' }}
              type='button'
              onClick={() => onClose()}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: 'right',
              }}
              type='submit'
              variant='contained'
              color='secondary'
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default EntryForm;
