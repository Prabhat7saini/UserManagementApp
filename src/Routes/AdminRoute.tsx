
import { Navigate } from "react-router-dom";
import { useContext, ReactNode } from "react"; // Import ReactNode type
import { userContext } from "../context/UserContext";

interface ProtectedRouteProps {
  children: ReactNode; 
}

export default function AdminRoute({ children }: ProtectedRouteProps) {
  const { currentUser } = useContext(userContext);
  console.log(currentUser,"inside admin router")
  if(!currentUser){
    console.log(currentUser,"inside admin route")
    return (<Navigate to="/login" />);
  }

  if (currentUser?.roleType === 'admin') return children;
  else {
    return (<p>This route is only for Admins.</p>);
  }
}