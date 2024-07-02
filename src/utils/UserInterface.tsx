
// import { Dispatch,SetStateAction } from "react";

export interface User {
    username: string;
    password:string,
    roleType: 'admin' | 'user'|'';
    name: string;
    address: string;
    phoneNumber: string;
    id: number;
  }
  
 export  interface AuthContextType {
    currentUser: User | null;
    isAuthenticated: () => boolean;
    login: (username: string, password: string, roleType: 'admin' | 'user') => Promise<void>;
    logout: () => void;
    loading: boolean;
  }

  export interface UserContextValue {
    currentUser:User|null
    Users: User[];
    Admins: User[];
    RegisterApi: (newUser: User) => Promise<void>;
    LoginApi:(newUser:User)=>Promise<User|undefined>;
    editUserApi:(newUser:User ,_id:number)=>Promise<void>;
    logout: () => void;
    isLoading:boolean,
    setIsloaging:(value:boolean)=>void;
   
  }

  export interface UserProviderProps {
    children: React.ReactNode;
  }


 