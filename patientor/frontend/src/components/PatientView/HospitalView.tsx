import { HospitalEntry, Diagnosis } from '../../types';
import { diagnosisCodes } from './Functions';
import { Typography, List, ListItem, ListItemText, Box } from '@mui/material';
import EntryTypeIcon from '../EntryTypeIcon';

interface HospitalViewPropsType {
  data: HospitalEntry
  diagnosis: Diagnosis[]
}

const HospitalView = ({ data, diagnosis }: HospitalViewPropsType) => {
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
        <Typography variant='body1' sx={{ fontWeight: '700', marginLeft: '10px' }}>{data.date}</Typography>
      </Box>
      <Typography variant='body1'>{data.description}</Typography>
      <Typography variant='body1' sx={{ fontStyle: 'italic' }}>Diagnose by {data.specialist}</Typography>
      {data.diagnosisCodes
        ? diagnosisCodes(data.diagnosisCodes, diagnosis)
        : null}
      <Typography variant='body1'>
        <b>Discharge</b>
      </Typography>
      <List dense>
        {Object.keys(data.discharge).map((keyName, i) => (
          <ListItem key={i}>
            <ListItemText>
              <b>{keyName}:</b> {data.discharge[keyName]}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default HospitalView;
