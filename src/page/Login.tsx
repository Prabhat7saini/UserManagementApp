import React, { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchema } from '../validactionSchema/UserRoleSChema';
import { userContext } from '../context/UserContext';
import { NavLink, useNavigate } from 'react-router-dom';
import  {delayPromise} from "../utils/Delay"

const Login: React.FC = () => {
  const navigate = useNavigate();

  const { LoginApi,isLoading,setIsloaging} = useContext(userContext)
  const roleOptions = ['admin', 'user'];
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
      roleType: '',

    },
  });
  const [error,setError]=useState<string>('');

  const onSubmit = async (data: any) => {
    
    
    try {
      setIsloaging(true);
      await delayPromise();
     const currentUser= await LoginApi(data);
      if ( currentUser?.roleType === 'admin') {
        navigate('/user-list')
      } else if(currentUser?.roleType==='user') {
        console.log(currentUser,"inside login page")
        navigate(`/profile/${currentUser.id}`)
      }else{
        console.log(`not match any role`)
      }
      setIsloaging(false);
    } catch (error) {
      if(error instanceof Error){

        console.  log(error.message)
        setError(error.message);
        setIsloaging(false);
      }
    }

  };
  if (isLoading) {
    console.log("loading....")
    return (<div>Loading.........</div>)
  }
  if (error) {
    return (<>
    
    <div style={{ color: "red" }}>{error}</div>
    <Button
        type="button"
        variant="outlined"
        color="secondary"
        fullWidth
        onClick={() => {
          window.location.reload();
        }}
      >
        Retry
      </Button>
    </>
    );

  }
  return (
    <Container>
      <Box
        sx={{
          border: '1px solid #ccc', 
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          padding: '1rem', 
          borderRadius: '8px', 
          borderWidth: '2px', 
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', margin: 'auto' }}>
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


            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
            <NavLink to="/">
            <Button type="button" variant="outlined" color="secondary" fullWidth>
            No account? Create one!
            </Button>
            </NavLink>
        
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
