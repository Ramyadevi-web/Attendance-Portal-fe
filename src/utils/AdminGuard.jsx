import { Navigate } from "react-router-dom"

const AdminGuard = ({children})=>{

    let token = sessionStorage.getItem('token')
    let role = sessionStorage.getItem('role')

  return ( token && role === 'Admin') ? children : <Navigate to= '/login'/>;
}

export default AdminGuard