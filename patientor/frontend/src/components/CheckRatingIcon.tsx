import { HealthCheckRating } from '../types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { styled } from '@mui/material/styles';

const HealthyFavoriteIcon = styled(FavoriteIcon)({
    fontSize: '32px',
    color: '#057d17',
});

const LowRiskFavoriteIcon = styled(FavoriteIcon)({
    fontSize: '32px',
    color: '#bcfa48',
});

const HighRiskFavoriteIcon = styled(FavoriteIcon)({
    fontSize: '32px',
    color: '#ffff14',
});

const CriticalRiskFavoriteIcon = styled(FavoriteIcon)({
    fontSize: '32px',
    color: '#f58700',
});

interface CheckRatingIconProps {
  rating: number
}

const CheckRatingIcon = ({ rating }: CheckRatingIconProps) => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return <HealthyFavoriteIcon />;
    case HealthCheckRating.LowRisk:
      return <LowRiskFavoriteIcon />;
    case HealthCheckRating.HighRisk:
      return <HighRiskFavoriteIcon />;
    default:
      return <CriticalRiskFavoriteIcon />;
  }
};

export default CheckRatingIcon;
