import { Navigate } from "react-router-dom"


const UserGuard = ({children})=>{

    let token = sessionStorage.getItem('token')
    
    let role = sessionStorage.getItem('role')
    console.log('usertoken',token,role)

  return  token && (role === 'Admin' || role === 'Staff' || role === 'Manager')? children : <Navigate to= '/login'/>;
}

export default UserGuard