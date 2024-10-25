import {
  OccupationalHealthcareEntry,
  Diagnosis,
  SickLeaveType,
} from '../../types';
import { diagnosisCodes } from './Functions';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import EntryTypeIcon from '../EntryTypeIcon';

interface OccupationalHealthcarePropType {
  data: OccupationalHealthcareEntry
  diagnoses: Diagnosis[]
}

const OccupationalHealthcareView = ({
  data,
  diagnoses,
}: OccupationalHealthcarePropType) => {
  const showSickLeave = (dates: SickLeaveType) => {
    return (
      <>
        <Typography variant='body1' sx={{ fontWeight: '700' }}>
          Sick dates
        </Typography>
        <List dense>
          <ListItem>
            <ListItemText>
              <b>Start:</b> {dates.startDate}
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <b>End:</b> {dates.endDate}
            </ListItemText>
          </ListItem>
        </List>
      </>
    );
  };

  return (
    <Box
      sx={{
        p: 2,
        border: '1px dashed black',
        borderRadius: 2,
        marginBottom: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'end' }}>
        <EntryTypeIcon type={data.type} />
        <Typography
          variant='body1'
          sx={{ fontWeight: '700', marginLeft: '10px' }}
        >
          {data.date}
        </Typography>
      </Box>
      <Typography variant='body1'>{data.description}</Typography>
      <Typography variant='body1' sx={{ fontStyle: 'italic' }}>
        Diagnose by {data.specialist}
      </Typography>
      <Typography variant='body1'>Working at {data.employerName}</Typography>
      {data.diagnosisCodes
        ? diagnosisCodes(data.diagnosisCodes, diagnoses)
        : null}
      {data.sickLeave ? showSickLeave(data.sickLeave) : null}
    </Box>
  );
};

export default OccupationalHealthcareView;
