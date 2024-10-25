import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { styled } from '@mui/material/styles';

const StyledFemaleIcon = styled(FemaleIcon)({
  fontSize: '32px',
  color: '#ff6d75',
  '&:hover': {
    color: '#ff3d47',
  },
});

const StyledMaleIcon = styled(MaleIcon)({
  fontSize: '32px',
  color: '#0388fc',
  '&:hover': {
    color: '#0474d6',
  },
});

const StyledOtherGenderIcon = styled(TransgenderIcon)({
  fontSize: '32px',
  color: '#e80ee1',
  '&:hover': {
    color: '#a3079e',
  },
});

interface GenderIconProps {
  gender: string
}

const GenderIcon = ({ gender }: GenderIconProps) => {
  switch (gender) {
    case 'female':
      return <StyledFemaleIcon />;
    case 'male':
      return <StyledMaleIcon />;
    default:
      return <StyledOtherGenderIcon />;
  }
};

export default GenderIcon;
