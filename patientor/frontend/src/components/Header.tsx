import { Link } from 'react-router-dom';
import { Typography, Button, Box } from '@mui/material';

const Header = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
      <Typography variant='h4' component='h1'>
        Patientor
      </Typography>
      <Button component={Link} to='/' variant='contained' color='primary'>
        Home
      </Button>
    </Box>
  );
};

export default Header;
