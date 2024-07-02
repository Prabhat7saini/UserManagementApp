import React, { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Button, FormControl, InputLabel, Select, MenuItem, dividerClasses } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterSchema } from '../validactionSchema/UserRoleSChema';
import { userContext } from '../context/UserContext';
import { NavLink, useNavigate } from "react-router-dom"
import { delayPromise } from "../utils/Delay"

const Register: React.FC = () => {
 const [err,setErr]=useState<string>('')
  const navigate = useNavigate();
  const { RegisterApi,isLoading,setIsloaging } = useContext(userContext);
  const roleOptions = ['admin', 'user'];
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues: {
      username: '',
      password: '',
      roleType: '',
      name: '',
      address: '',
      phoneNumber: '',
    },
  });

  const onSubmit = async (data: any) => {
    try {
      // console.log(data,"register")
      setIsloaging(true);
    await  delayPromise();

      await RegisterApi(data);
      console.log(`dlkjfdslkjfdslkjfdslkj`)
      setIsloaging(false)


      console.log('User registered successfully:', data);
      navigate('/login')
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Erororororo`)
        console.log('Error registering user:', error.message);
        // console.log(error.message, "error");
        setErr(error.message);
      } else {
        console.log('An unknown error occurred');
      }
      setIsloaging(false);
    }
  };
  if (isLoading) {
    console.log("loading....")
    return (<div>Loading.........</div>)
  }
  if(err){
    return (<p style={{ color: "red" }}>{err}</p>)
  }
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          border: '1px solid #ccc',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          padding: '1rem',
          borderRadius: '8px',
          margin: 'auto',
          marginTop: '2rem',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField {...field} type="text" label="Username" variant="outlined" fullWidth />
              )}
            />
            {errors.username && <p>{errors.username.message}</p>}

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField {...field} type="password" label="Password" variant="outlined" fullWidth />
              )}
            />
            {errors.password && <p>{errors.password.message}</p>}

            <Controller
              name="roleType"
              control={control}
              render={({ field }) => (
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="roleType-label">Role Type</InputLabel>
                  <Select
                    labelId="roleType-label"
                    {...field}
                    label="Role Type"
                    defaultValue=""
                    error={!!errors.roleType}
                  >
                    {roleOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            {errors.roleType && <p>{errors.roleType.message}</p>}

            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField {...field} type="text" label="Name" variant="outlined" fullWidth />
              )}
            />
            {errors.name && <p>{errors.name.message}</p>}

            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField {...field} type="text" label="Address" variant="outlined" fullWidth />
              )}
            />
            {errors.address && <p>{errors.address.message}</p>}

            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <TextField {...field} type="text" label="Phone Number" variant="outlined" fullWidth />
              )}
            />
            {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Next
            </Button>
            
            {/* Use NavLink from 'react-router-dom' for navigation */}
            <NavLink to="/login" style={{ textDecoration: 'none' }}>
              <Button variant="outlined" color="secondary" fullWidth>
                Already a User? Login
              </Button>
            </NavLink>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
