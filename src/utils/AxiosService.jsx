import axios from 'axios'

const AxiosService = axios.create({
    baseURL: "https://attendanceportalcapstone.onrender.com",
        headers:{
            "Content-Type":"application/json"
        }
    
})

 AxiosService.interceptors.request.use(config=>{
    let token = sessionStorage.getItem('token')

    if(config.allowAbsoluteUrls && token){
        config.headers.Authorization = `Bearer ${token}`
    }
    console.log(config)
    return config
 })

export default AxiosService