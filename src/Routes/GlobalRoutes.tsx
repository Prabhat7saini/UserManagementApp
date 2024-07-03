import { BrowserRouter ,Routes,Route} from 'react-router-dom'
import Header from '../components/Header'
import Register from '../page/Register'
import Login from '../page/Login'
import AdminRoute from  "./AdminRoute"
import UserList from '../page/UserList'
// import UserRoute from "./UserRoute"
import Profile from '../page/Profile'

const GlobalRoutes = () => {
  return (
    <BrowserRouter>
      <Header></Header>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-list" element={
            <AdminRoute>
            <UserList/>
            </AdminRoute>
            
            }/>
          <Route path="/profile/:id" element={
            // <UserRoute>

            
            <Profile/>
            // </UserRoute>
            
            
            }/>
        </Routes>

      </BrowserRouter>
  )
}

export default GlobalRoutes
