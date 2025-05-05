import { useNavigate } from "react-router-dom"

const useLogout = ()=>{
    const navigate = useNavigate()
    return ()=>{sessionStorage.clear()
    navigate('/login')
    }
}

export default useLogout