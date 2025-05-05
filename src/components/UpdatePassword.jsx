import React,{useRef} from 'react'
import { useParams, useNavigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import toast from 'react-hot-toast';
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes';

function UpdatePassword() {

    let passwordRef = useRef()
    let {token} = useParams()
    const navigate = useNavigate()

    const handleUpdatePassword = async(event)=>{
      event.preventDefault()

        try {
           const res = await AxiosService.post(`${ApiRoutes.UPDATEPASSWORD.path}/${token}`,{password:passwordRef.current.value})
           toast.success(res.data.message)
           navigate('/login')
        } catch (error) {
          console.log(error)
            toast.error(  error.response.data.message || "Internal Server Error")
        }

    } 

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
    <Card className="p-4 shadow" style={{ width: '30rem' }}>
      <h4 className="text-center mb-4">Reset Password</h4>
      <Form>
        <Form.Group>
          <Form.Label>New Password</Form.Label>
          <Form.Control type="password" ref={passwordRef} placeholder="Enter new password" />
        </Form.Group>
        <div className="text-center mt-4">
          <button className="btn btn-success" onClick={handleUpdatePassword}>Reset Password</button>
        </div>
      </Form>
    </Card>
  </Container>
  )
}

export default UpdatePassword
