import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Table,
  Button,
  TableHead,
  Typography,
  TableCell,
  TableRow,
  TableBody,
} from '@mui/material';
import axios from 'axios';

import { PatientFormValues, Patient } from '../../types';
import AddPatientModal from '../AddPatientModal';

import HealthRatingBar from '../HealthRatingBar';

import patientService from '../../services/patients';

interface Props {
  patients: Patient[]
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>
}

const PatientListPage = ({ patients, setPatients }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const patient = await patientService.create(values);
      setPatients(patients.concat(patient));
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            ''
          );
          console.error(message);
          setError(message);
        } else {
          setError('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  return (
    <div className='App'>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '2rem',
        }}
      >
        <Typography variant='h5' component='h2'>
          Patient list
        </Typography>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => openModal()}
        >
          Add New Patient
        </Button>
      </Box>
      <Table sx={{ marginBottom: '2em' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: '700' }}>Name</TableCell>
            <TableCell sx={{ fontWeight: '700' }}>Gender</TableCell>
            <TableCell sx={{ fontWeight: '700' }}>Occupation</TableCell>
            <TableCell sx={{ fontWeight: '700' }}>Health Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(patients).map((patient: Patient) => (
            <TableRow key={patient.id}>
              <TableCell sx={{ fontWeight: '700' }}>
                <Link
                  to={`/patients/${patient.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  {patient.name}
                </Link>
              </TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.occupation}</TableCell>
              <TableCell>
                <HealthRatingBar showText={false} rating={1} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
    </div>
  );
};

export default PatientListPage;
