import Login from '../components/Login'
import Signup from '../components/Signup'
import Profile from '../components/Profile'
import ForgotPassword from '../components/ForgotPassword'
import UpdatePassword from '../components/UpdatePassword'
import {Navigate} from 'react-router-dom'
import AdminGuard from './AdminGuard'
import UserGuard from './UserGuard'
import DisplayStaff from '../components/DisplayStaff'
import ViewAttendance from '../components/ViewAttendance'
import LeaveApplication from '../components/LeaveApplication'
import LeaveStatus from '../components/LeaveStatus'
import LeaveManagement from '../components/LeaveManagement'
import DisplayEmployee from '../components/DisplayEmployee'
import DisplayHigher from '../components/DisplayHigher'


const AppRoutes = [
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/signup',
        element:<Signup/>
    },
    {
        path:'/profile/:id',
        element:<UserGuard>
                 <Profile/>
                </UserGuard>
    },
    {
        path:'/forgotpassword',
        element: <ForgotPassword/>
                
    },
    {
        path:'/updatepassword/:token',
        element: <UpdatePassword/>
                
    },
    {
        path:'/display-staff',
        element: <DisplayStaff/>
                
    },
    {
        path:'/view-attendance',
        element: <ViewAttendance/>
                
    },
    {
        path:'/leave-application',
        element: <LeaveApplication/>
                
    },
    {
        path:'/leave-status',
        element: <LeaveStatus/>
                
    },
    {
        path:'/leave-management',
        element: <LeaveManagement/>
                
    },
    {
        path:'/display-all-employee',
        element: <AdminGuard>
                 <DisplayEmployee/>
                 </AdminGuard>   
    },
    {
        path:'/display-higher-authority',
        element: <DisplayHigher/>
                
    },
    {
        path:'/display-leave-request',
        element: <LeaveManagement/>
                
    },
    {
        path:'*',
        element:<Navigate to ='/login'/>
    }
]

export default AppRoutes;