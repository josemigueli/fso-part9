import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
} from '@mui/material';
import EntryForm from './EntryForm';
import { Entry, Diagnosis } from '../../types';

interface AddEntryModalType {
  openModal: boolean
  onClose: () => void
  diagnosis: Diagnosis[]
  patientId: string
  onData: (d: Entry) => void
}

const AddEntryModal = ({
  openModal,
  onClose,
  diagnosis,
  patientId,
  onData,
}: AddEntryModalType) => {
  const [error, setError] = useState<string>();
  const showError = (d: string) => {
    setError(d);
    setTimeout(() => {
      setError(undefined);
    }, 5000);
  };
  return (
    <Dialog fullWidth={true} open={openModal} onClose={() => onClose()}>
      <DialogTitle>Add a new entry</DialogTitle>
      {error && <Alert severity='error'>{error}</Alert>}
      <Divider />
      <DialogContent>
        <EntryForm
          onClose={() => onClose()}
          diagnosis={diagnosis}
          patientId={patientId}
          error={showError}
          onData={onData}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;
