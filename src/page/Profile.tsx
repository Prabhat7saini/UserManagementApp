import { useContext, useState } from 'react';
import { userContext } from '../context/UserContext';
import { Container, Grid, Typography, Paper, Box, Button, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { User } from '../utils/UserInterface';
import { delayPromise } from '../utils/Delay';
const Profile = () => {
  const { currentUser ,editUserApi,isLoading,setIsloaging} = useContext(userContext);
  
  const { register, handleSubmit, formState: { errors } } = useForm<User>();
  const [isEditing, setIsEditing] = useState(false);
let { id }=useParams();
console.log("Params:",id)

// console.log(typeof id ,typeof currentUser?.id)

const toggleEdit = () => {
  setIsEditing(!isEditing);
};
if(id!=currentUser?.id){
  return(<div>Unauthorized access</div>)
}
  // console.log(currentUser,"inside profile page")
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
  const onSubmit: SubmitHandler<User> = async(data) => {
    try {
      setIsloaging(true);
      await delayPromise();
      if(id)    
      data.id=parseInt(id);
      data.username=currentUser?.username,
      data.roleType=currentUser?.roleType,
      data.password=currentUser?.password;/*  */
  
      editUserApi(data,data.id);
      setIsloaging(false);
      console.log(data,"updated data");
      toggleEdit();
    } catch (error) {
      setIsloaging(false)
    }
  };

  if (isLoading) {
    console.log("loading....")
    return (<div>Loading.........</div>)
  }
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          User Profile
        </Typography>

        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  {...register('name', { required: true })}
                  label="Name"
                  defaultValue={currentUser?.name}
                  error={!!errors.name}
                  helperText={errors.name ? 'Name is required' : ''}
                  fullWidth
                  sx={{ mt: 2 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  {...register('address', { required: true })}
                  label="Address"
                  defaultValue={currentUser?.address}
                  error={!!errors.address}
                  helperText={errors.address ? 'Address is required' : ''}
                  fullWidth
                  sx={{ mt: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('phoneNumber', { required: true })}
                  label="Phone Number"
                  defaultValue={currentUser?.phoneNumber}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber ? 'Phone Number is required' : ''}
                  fullWidth
                  sx={{ mt: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button type="submit" variant="contained" color="primary">
                    Save Changes
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={toggleEdit} sx={{ ml: 2 }}>
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                Username: {currentUser.username}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                Role: {currentUser.roleType}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                Name: {currentUser.name}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                Address: {currentUser.address}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                Phone Number: {currentUser.phoneNumber}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button variant="contained" color="primary" onClick={toggleEdit}>
                  Edit Details
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default Profile;



