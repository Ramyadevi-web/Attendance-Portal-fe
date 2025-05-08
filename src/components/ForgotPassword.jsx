import React ,{useRef,useState}from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';
import toast from 'react-hot-toast'

function ForgotPassword() {

  const emailRef = useRef()
  const navigate = useNavigate()

  const handleForgotPassword = async (event)=>{
     event.preventDefault()
     let res=""

      try {
        const email = emailRef.current.value;
     
        if(!email){
        alert("Enter valid email Id")
        }

         await AxiosService.post(ApiRoutes.FORGOTPASSWORD.path,{email:email})
          .then((res)=>{
            alert(res.data.message)
            navigate('/login')
          })
          .catch((error)=>{
            alert(error.response.data.error)
          })
      
        
      } catch (error) {

        toast.error(error.response.data.message || error.message)
      }
  }

  return (
    <Container>
    <h1 className='d-flex justify-content-center my-5 fw-5'>Forgot Password</h1>
  <div className="d-flex justify-content-center align-items-center vh-90">
  <Card style={{ width: '30rem' }} className="p-5 shadow">

    <Form>  
      <Form.Group as={Row} className="mb-5" controlId="formPlaintextEmail">
        <Form.Label  className='mb-4'>
          Enter your registered emailid to reset password
        </Form.Label>
        <Col >
          <Form.Control type="email" placeholder="email@example.com" ref={emailRef} />
        </Col>
      </Form.Group>

      <div className="text-end d-flex justify-content-center">
        <button className="btn btn-primary  px-4 py-2" onClick={handleForgotPassword}>Submit</button>
      </div>
    </Form>
  </Card>
  </div>
</Container>

  )
}

export default ForgotPassword
