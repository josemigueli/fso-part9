import { HealthCheckEntry, Diagnosis } from '../../types';
import { diagnosisCodes } from './Functions';
import { Typography, Box } from '@mui/material';
import EntryTypeIcon from '../EntryTypeIcon';
import CheckRatingIcon from '../CheckRatingIcon';

interface HealthCheckViewPropType {
  data: HealthCheckEntry
  diagnosis: Diagnosis[]
}

const HealthCheckView = ({ data, diagnosis }: HealthCheckViewPropType) => {
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
      <CheckRatingIcon rating={data.healthCheckRating}/>
      {data.diagnosisCodes
        ? diagnosisCodes(data.diagnosisCodes, diagnosis)
        : null}
    </Box>
  );
};

export default HealthCheckView;
