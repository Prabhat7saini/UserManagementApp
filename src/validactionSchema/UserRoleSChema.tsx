import * as yup from 'yup';

// Define role options for dropdown
const roleOptions = ['admin', 'user'];

export const RegisterSchema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  roleType: yup.string().oneOf(roleOptions, 'Invalid role type').required('Role type is required'),
  name: yup.string().required('Name is required'),
  address: yup.string().required('Address is required'),
  phoneNumber: yup.string().required('Phone number is required'),
 
});

export const LoginSchema =yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  roleType: yup.string().oneOf(roleOptions, 'Invalid role type').required('Role type is required'),
  
});
