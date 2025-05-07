import React,{useRef} from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes';



function AddUser() {

  const navigate = useNavigate()


  const handleAddUser = async (event)=>{
         event.preventDefault();

        let formData = new FormData(event.target)
        let data = Object.fromEntries(formData)

        if(data.password != data.confirmPassword)
          return  toast.error('Password and Confirm Password Mismatch')

         try {
           await AxiosService.post(ApiRoutes.SIGNUP.path,data)
           toast.success('User signed up successfully')
           navigate('/manage-user')
         } catch (error) {
          console.log(error)
            toast.error(error.response.data.message || error.response.data.error)
         }
  }

  return (
    <Container>
    <h1 className='d-flex justify-content-center my-5 fw-5'>Add New User</h1>
  <div className="d-flex justify-content-center align-items-center vh-90">
  <Card style={{ width: '30rem' }} className="p-5 shadow">

    <Form onSubmit={handleAddUser}>  
    <Form.Group as={Row} className="mb-5" controlId="formPlaintextFName">
        <Form.Label column sm="3">
          First Name
        </Form.Label>
        <Col sm="9">
          <Form.Control type="text" placeholder="First Name" name="firstName" required/>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-5" controlId="formPlaintextLName">
        <Form.Label column sm="3">
          Last Name
        </Form.Label>
        <Col sm="9">
          <Form.Control type="text" placeholder="Last Name" name="lastName" required/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-5" controlId="formPlaintextMobile">
        <Form.Label column sm="3">
          Mobile
        </Form.Label>
        <Col sm="9">
          <Form.Control type="text" placeholder="Mobile Number" name="mobile" required/>
        </Col>
      </Form.Group>
      
      <Form.Group as={Row} className="mb-5" controlId="formPlaintextEmail">
        <Form.Label column sm="3">
          Email
        </Form.Label>
        <Col sm="9">
          <Form.Control type="email" placeholder="email@example.com"  name="email" required/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-5" controlId="formPlaintextPassword">
        <Form.Label column sm="3">
          Password
        </Form.Label>
        <Col sm="9">
          <Form.Control type="password" placeholder="*************" name="password" required/>
        </Col>
      </Form.Group>
      
      <Form.Group as={Row} className="mb-5" controlId="formPlaintextConfirmPassword">
        <Form.Label column sm="3">
          Confirm Password
        </Form.Label>
        <Col sm="9">
          <Form.Control type="password" placeholder="*************" name="confirmPassword" required/>
        </Col>
      </Form.Group>
    

      <div className="text-end d-flex justify-content-center">
        <button className="btn btn-primary  px-4 py-2">Add User</button>
      </div>
    </Form>
  </Card>
  </div>
</Container>
  )
}

export default AddUser
