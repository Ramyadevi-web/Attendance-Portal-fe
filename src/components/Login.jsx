import React,{useRef,useEffect} from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { useNavigate,Link} from 'react-router-dom';
import toast from 'react-hot-toast';
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes';



function Login() {

  const navigate = useNavigate()

  useEffect(()=>{
    sessionStorage.clear()
  },[])
  

   const  handleLogin = async (event)=>{
    event.preventDefault()
    
    try {
        let formData = new FormData(event.target)
        let data = Object.fromEntries(formData)
     
        let res = await AxiosService.post(ApiRoutes.LOGIN.path,data)
  
        if(res.status == 200){
          
            sessionStorage.setItem('token',res.data.token)
            sessionStorage.setItem('role',res.data.role)
            sessionStorage.setItem('id',res.data.id)
            toast.success(res.data.message)   
            // navigate('/forgotPassword')

              // if(res.data.role === 'Admin' || res.data.role === 'Manager'){
                // navigate('/dashboard')
              // }else{
                  navigate(`/profile/${res.data.id}`)
              // }
    
            
        }
    } catch (error) {
      console.log(error)
        toast.error( error.response.data.message || error.message)
    }
   }

  return (


    <Container>
        <h1 className='d-flex justify-content-center my-5 fw-5'>Login</h1>
      <div className="d-flex justify-content-center align-items-center vh-90">
      <Card style={{ width: '30rem' }} className="p-5 shadow">
 
        <Form onSubmit={handleLogin}>  
          <Form.Group as={Row} className="mb-5" controlId="formPlaintextEmail">
            <Form.Label column sm="3">
              Email
            </Form.Label>
            <Col sm="9">
              <Form.Control type="text" placeholder="email@example.com"  name="email"/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-5" controlId="formPlaintextPassword">
            <Form.Label column sm="3">
              Password
            </Form.Label>
            <Col sm="9">
              <Form.Control type="password" placeholder="*************"  name="password" />
            </Col>
          </Form.Group>

          <div className="text-end d-flex justify-content-center">
            <button className="btn btn-primary  px-4 py-2" type='submit'>Login</button>
          </div>
        </Form>
        
        <p className="mt-3 text-center small">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
        <p className="mt-3 text-center small">
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
      </Card>
      </div>
    </Container>

  )
}

export default Login
