import { useContext } from 'react';
import { userContext } from '../context/UserContext';
import { Container, Grid, Typography, Paper, Box } from '@mui/material';

const Profile = () => {
  const { currentUser } = useContext(userContext);


  console.log(currentUser,"inside profile page")
  if (!currentUser) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            User Profile
          </Typography>
          <Typography variant="body1">
            No user data found. Please log in to view your profile.
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          User Profile
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex">
              <Typography variant="subtitle1" sx={{ width: 150, fontWeight: 'bold' }}>
                Username:
              </Typography>
              <Typography variant="body1">{currentUser.username}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex">
              <Typography variant="subtitle1" sx={{ width: 150, fontWeight: 'bold' }}>
                Role:
              </Typography>
              <Typography variant="body1">{currentUser.roleType}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex">
              <Typography variant="subtitle1" sx={{ width: 150, fontWeight: 'bold' }}>
                Name:
              </Typography>
              <Typography variant="body1">{currentUser.name}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex">
              <Typography variant="subtitle1" sx={{ width: 150, fontWeight: 'bold' }}>
                Address:
              </Typography>
              <Typography variant="body1">{currentUser.address}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex">
              <Typography variant="subtitle1" sx={{ width: 150, fontWeight: 'bold' }}>
                Phone Number:
              </Typography>
              <Typography variant="body1">{currentUser.phoneNumber}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Profile;
