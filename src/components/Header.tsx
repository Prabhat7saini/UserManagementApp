import { Box, Typography } from '@mui/material';
import { useContext } from 'react';
import { userContext } from '../context/UserContext';
import ButtonC from './common/ButtonC';

const CenteredText = () => {
  const { logout, currentUser } = useContext(userContext);

  const handleLogout = () => {
    logout();
    console.log('Logging out...');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '8vh',
        backgroundColor: '#FFFFFF',
        padding: '0 20px',
      }}
    >
      <Typography variant="h4">User management app</Typography>
      {currentUser && <ButtonC text='Logout' onClick={handleLogout} />}
    </Box>
  );
};

export default CenteredText;
