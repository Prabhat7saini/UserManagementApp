import React, { useContext, useState } from 'react';
import { Box, Button, Card, CardContent, Typography, TextField } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import {User} from "../utils/UserInterface"
import { userContext } from '../context/UserContext';
import { delayPromise } from '../utils/Delay';



const UserListed: React.FC<User> = ({ id, name, address, phoneNumber,username,roleType,password, }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<User>();
  const [isEditing, setIsEditing] = useState(false);
const  {editUserApi,isLoading,setIsloaging}=useContext(userContext)
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const onSubmit: SubmitHandler<User> = async(data) => {

    try {
      setIsloaging(true);
      await delayPromise();
      data.id=id;
      data.username=username,
      data.roleType=roleType,
      data.password=password;/*  */
  
      editUserApi(data,id);
      console.log(data,"1114");
      setIsloaging(false);
      toggleEdit();
    } catch (error) {
      setIsEditing(false);
    }

  };
  
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">User Details : Id - { id}</Typography>
        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mt: 2 }}>
              <TextField
                {...register('name', { required: true })}
                label="Name"
                defaultValue={name}
                error={!!errors.name}
                helperText={errors.name ? 'Name is required' : ''}
                fullWidth
              />
              <TextField
                {...register('address', { required: true })}
                label="Address"
                defaultValue={address}
                error={!!errors.address}
                helperText={errors.address ? 'Address is required' : ''}
                fullWidth
                sx={{ mt: 2 }}
              />
              <TextField
                {...register('phoneNumber', { required: true })}
                label="Phone Number"
                defaultValue={phoneNumber}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber ? 'Phone Number is required' : ''}
                fullWidth
                sx={{ mt: 2 }}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
              <Button variant="outlined" color="secondary" onClick={toggleEdit} sx={{ ml: 2 }}>
                Cancel
              </Button>
            </Box>
          </form>
        ) : (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1">Name: {name}</Typography>
            <Typography variant="body1">Address: {address}</Typography>
            <Typography variant="body1">Phone Number: {phoneNumber}</Typography>
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" color="primary" onClick={toggleEdit}>
                Edit Details
              </Button>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default UserListed;

