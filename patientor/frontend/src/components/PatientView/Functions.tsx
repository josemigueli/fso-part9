import { Diagnosis } from '../../types';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

export const diagnosisCodes = (
  code: Array<Diagnosis['code']>,
  diagnoses: Diagnosis[]
) => {
  if (code.length > 0) {
    const selectCodes = code.map((c) => {
      const find = diagnoses.find((d) => d.code.toString() === c.toString());
      return { ...find };
    });

    return (
      <>
        <Typography variant='body1' sx={{ fontWeight: '700' }}>
          Diagnosis
        </Typography>
        <List dense>
          {selectCodes.map((c, i) => (
            <ListItem key={i}>
              <ListItemText>
                {c.code} - {c.name}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </>
    );
  }
  return (
    <>
      <Typography variant='body1' sx={{ fontWeight: '700' }}>
        Diagnosis
      </Typography>
      <Typography variant='body1' sx={{ fontStyle: 'italic' }}>
        No diagnosis codes...
      </Typography>
    </>
  );
};
