import React from 'react'
import { useContext ,useState} from 'react';
import { userContext } from '../context/UserContext';
import { Container,Paper,Typography ,TextField,Grid,Box,Button} from '@mui/material';
import { useForm, SubmitHandler, } from 'react-hook-form';
import { User } from '../utils/UserInterface';
interface urlid{
intid:number

}
const AdminUser:React.FC<urlid>= ({intid}) => {
    const { register, handleSubmit, formState: { errors } } = useForm<User>();
    const {Users}=useContext(userContext)
    const UserAdmin=Users.find((u)=>u.id=intid);
    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = () => {
        setIsEditing(!isEditing);
      };
  
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        User Profile
      </Typography>

      
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              Username: {UserAdmin?.username}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              Role: {UserAdmin?.roleType}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              Name: {UserAdmin?.name}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              Address: {UserAdmin?.address}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              Phone Number: {UserAdmin?.phoneNumber}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button variant="contained" color="primary" onClick={toggleEdit}>
                Edit Details
              </Button>
            </Box> */}
            
          </Grid>
        </Grid>

    </Paper>
  </Container>
  )
}

export default AdminUser
