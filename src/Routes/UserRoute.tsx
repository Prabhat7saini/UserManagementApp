
import { Navigate } from "react-router-dom";
import { useContext, ReactNode } from "react"; 
import { userContext } from "../context/UserContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { currentUser } = useContext(userContext);
  console.log(currentUser,"inside UserRoute")
  if (!currentUser) {
    return (<Navigate to="/login" />);
  }

  if (currentUser?.roleType === 'user') return children;
  else {
    return (<p>This route is only for User.</p>);
  }
}