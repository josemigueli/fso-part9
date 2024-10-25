import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import diagnosesService from '../../services/diagnoses';
import { Entry, Patient, Diagnosis } from '../../types';
import EntriesView from './EntriesView';
import AddEntryModal from '../AddEntryModal';
import { Typography, Button, Box } from '@mui/material';
import GenderIcon from '../GenderIcon';

const PatientView = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  const [openCloseModal, setOpenCloseModal] = useState<boolean>(false);

  const showHideModal = (): void => setOpenCloseModal(!openCloseModal);
  
  const newEntryData = (d: Entry) => {
    if (patient && patient.entries) {
      const newEntries: Entry[] = patient.entries.concat(d);
      setPatient({ ...patient, entries: newEntries });
    }
  };

  useEffect(() => {
    if (id) {
      patientService.getById(id).then((p) => setPatient(p));
      diagnosesService.getDiagnoses().then((d) => setDiagnoses(d));
    }
  }, []);

  if (!patient || !diagnoses || !id) return null;

  return (
    <Box>
      <AddEntryModal
        openModal={openCloseModal}
        onClose={showHideModal}
        diagnosis={diagnoses}
        patientId={id}
        onData={newEntryData}
      />
      <Typography variant='h4' component='h2' align='center'>
        {patient.name}
      </Typography>
      <Typography align='center'>
      <GenderIcon gender={patient.gender}/>
      </Typography>
      

      <Typography variant='body1' align='center'>
        <b>SSN:</b> {patient.ssn}
      </Typography>
      <Typography variant='body1' align='center'>
        <b>Ocuppation:</b> {patient.occupation}
      </Typography>
      <Box sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '2rem',
            alignItems: 'end',
          }}
        >
          <Typography variant='h5' component='h3'>
            Entries
          </Typography>
          <Button
            type='button'
            variant='contained'
            color='secondary'
            onClick={showHideModal}
          >
            Add entry
          </Button>
        </Box>
        <Box>
          {patient.entries.length > 0 ? (
            <>
              {patient.entries.map((p, i) => (
                <EntriesView key={i} entry={p} diagnoses={diagnoses} />
              ))}
            </>
          ) : (
            <Typography variant='body1'>No entries yet...</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PatientView;
