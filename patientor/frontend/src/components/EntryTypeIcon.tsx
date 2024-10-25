import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { styled } from '@mui/material/styles';
import { EntryTypes } from '../types';

const StyledLocalHospitalIcon = styled(LocalHospitalIcon)({
  fontSize: '32px',
  color: '#0388fc',
});

const StyledMedicalInformationIcon = styled(MedicalInformationIcon)({
  fontSize: '32px',
  color: '#0388fc',
});

const StyledHealthAndSafetyIcon = styled(HealthAndSafetyIcon)({
  fontSize: '32px',
  color: '#0388fc',
});

interface EntryTypeIconProps {
  type: string
}

const EntryTypeIcon = ({ type }: EntryTypeIconProps) => {
  switch (type) {
    case EntryTypes.Hospital.replace(/ /g, ''):
      return <StyledLocalHospitalIcon />;
    case EntryTypes.HealthCheck.replace(/ /g, ''):
      return <StyledMedicalInformationIcon />;
    default:
      return <StyledHealthAndSafetyIcon />;
  }
};

export default EntryTypeIcon;
