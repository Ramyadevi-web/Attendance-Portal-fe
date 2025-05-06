const ApiRoutes = {
    LOGIN:{
        path:'user/signIn',
        authenticate:false
    },
    SIGNUP:{
        path:'user/signUp',
        authenticate:false
    },
    DASHBOARD:{
        path:'user/dashboard',
        authenticate:false
    },
    FORGOTPASSWORD:{
        path:'user/forgotPassword',
        authenticate:false
    },
    UPDATEPASSWORD:{
        path:'user/updatePassword',
        authenticate:false
    },
    PROFILE:{
        path:'user/:id',
        authenticate:true
    },
    DISPLAYSTAFF:{
        path:'manager/display-staff',
        authenticate:false
    },
    RECORDATTENDANCE:{
        path:'attendance/record-attendance',
        authenticate:false
    },
    VIEWATTENDANCE:{
        path:'attendance/attendance-by-date/:date',
        authenticate:false
    },
    MANAGEATTENDANCE:{
        path:'attendance/manage-attendance',
        authenticate:false
    },
    APPLYLEAVE: {
        path:'leave/apply-leave/:id',
        authenticate:false
    },
    LEAVESTATUS: {
        path: 'leave/leave-status/:id',
        authenticate:false
    },
    LEAVEMANAGEMENT: {
        path: '/manager/leave-request-action',
        authenticate:false
    },
    ACTION: {
        path: '/manager/leave-request-action/:id',
        authenticate:false
    },
    DISPLAYEMPLOYEE: {
        path: 'admin/display-employee',
        authenticate: false
    },
    DISPLAYHIGHER: {
        path: 'manager/display-staff',
        authenticate: false
    }
}

export default ApiRoutes