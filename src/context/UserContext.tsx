import React, { createContext, useState, useEffect } from 'react';
import localforage from 'localforage';
import { User, UserContextValue, UserProviderProps } from '../utils/UserInterface';
// import { Dispatch, SetStateAction } from 'react';

export const userContext = createContext<UserContextValue>({
  Users: [],
  Admins: [],
  RegisterApi: async () => { throw new Error('RegisterApi is not initialized'); },
  LoginApi: async () => { throw new Error('LoginApi is not initialized'); },
  currentUser: null,
  editUserApi: async () => { throw new Error('editUserApi is not initialized'); },
  logout: () => { },
});

const UserContextProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userLocal, setUserLocal] = useState<User[]>([]);
  const [adminLocal, setAdminLocal] = useState<User[]>([]);
  // const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const savedUsers = (await localforage.getItem<User[]>('userLocal')) || [];
        const savedAdmins = (await localforage.getItem<User[]>('adminLocal')) || [];
        setUserLocal(savedUsers);
        setAdminLocal(savedAdmins);
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, []);

  const RegisterApi = async (newUser: User) => {
    try {
      if (newUser.roleType === 'admin') {
        const existingUser = userLocal.find((user) => user.username === newUser.username);
        console.log(existingUser, "inside RegiserApi")
        if (existingUser) {
          throw new Error('Users are not allowed to register as an admin');
        }
        if (adminLocal.length > 0) {
          throw new Error('Cannot register more than one admin.');
        } else {
          newUser.id = 1;
          await localforage.setItem('adminLocal', [newUser]);
          setAdminLocal([newUser]);
        }
      } else if (newUser.roleType === 'user') {
        if (adminLocal.length > 0 && adminLocal[0].username === newUser.username) {
          throw new Error('Admins are not allowed to register as a user');
        }
        const existingUser = userLocal.find((user) => user.username === newUser.username);
        if (userLocal.length >= 5) {
          throw new Error('User limit exceeded');
        }
        if (existingUser) {
          throw new Error('Username already exists. Please choose a different username.');
        } else {
          newUser.id = userLocal.length + 1;
          await localforage.setItem('userLocal', [...userLocal, newUser]);
          setUserLocal([...userLocal, newUser]);
        }
      } else {
        throw new Error('User type not matched');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };

  const LoginApi = async (loginUser: User) => {
    try {
      if (loginUser.roleType === 'admin') {
        const existingUser = adminLocal.find((user) => user.username === loginUser.username);
        const roleCheck = existingUser?.roleType === loginUser.roleType
        if (!existingUser) {
          throw new Error('User does not exist');

        }
        if (existingUser.password !== loginUser.password) {
          throw new Error('Credentials do not match');

        }
        // setCurrentUser(existingUser);
        if (!roleCheck) {
          throw new Error(`Your roleType and user details not same`)

        }
        if (existingUser) {
          setCurrentUser(existingUser);
          localStorage.setItem('currentUser', JSON.stringify(existingUser));
        }
        return existingUser;
      } else {
        const existingUser = userLocal.find((user) => user.username === loginUser.username);
        if (!existingUser) {
          throw new Error('User does not exist');

        }
        if (existingUser.password !== loginUser.password) {
          throw new Error('Credentials do not match');

        }
        if (existingUser) {
          setCurrentUser(existingUser);
          localStorage.setItem('currentUser', JSON.stringify(existingUser));
        }
        return existingUser;
      }
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;

    }
  };

  const editUserApi = async (updatedUser: User, _id: number) => {
    try {

      if (!currentUser || (currentUser.roleType !== 'admin')) {
        throw new Error('Unauthorized: Only admins can edit any user role.');
      }

      if (updatedUser.roleType === 'admin') {
        const existingUserIndex = adminLocal.findIndex((user) => user.id === _id);
        if (existingUserIndex === -1) {
          throw new Error('Admin user not found');
        }
        adminLocal[existingUserIndex] = updatedUser;
        await localforage.setItem('adminLocal', adminLocal);
        setAdminLocal([...adminLocal]);
      } else {
        const existingUserIndex = userLocal.findIndex((user) => user.id === _id);
        if (existingUserIndex === -1) {
          throw new Error('User not found');
        }
        userLocal[existingUserIndex] = updatedUser;
        await localforage.setItem('userLocal', userLocal);
        setUserLocal([...userLocal]);
      }
    } catch (error) {
      console.error('Error editing user:', error);
      throw error;
    }
  };
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    // Additional cleanup or reset logic if needed
  };
  const contextValue: UserContextValue = {
    Users: userLocal,
    Admins: adminLocal,
    RegisterApi,
    LoginApi,
    currentUser,
    editUserApi,
    logout,
  };

  return (
    <userContext.Provider value={contextValue}>
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
