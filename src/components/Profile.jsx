import React, { useEffect,useState } from 'react';
import { Container, Card, Row, Col, ListGroup, Button, Badge } from 'react-bootstrap';
import TopBar from './TopBar';
import ApiRoutes from '../utils/ApiRoutes';
import { useParams } from 'react-router-dom';
import AxiosService from '../utils/AxiosService';
import Spinner from './Spinner'
import Error from './Error'

const ProfilePage = () => {

  let {id} = useParams()
  let [user,setUser] = useState(null)
  let [presentCount,setPresentCount] = useState(0)
  let [absentCount,setAbsentCount] = useState(0)
  let [totalDays,setTotalDays] = useState(0)
  let [error,setError] = useState(null)

  const getProfileData = async ()=>{
  
    try {
      const res = await AxiosService.get(`${ApiRoutes.PROFILE.path.replace(':id', id)}`,{
        allowAbsoluteUrls:ApiRoutes.PROFILE.authenticate
      })
        
         let attendance = res.data.user.attendance
         let data = res.data.user
  
         for(let item of attendance){
             if(item.status === 'Present'){
              presentCount++
             }
  
             if(item.status === 'Absent'){
              absentCount++
             }
         }
         setAbsentCount(absentCount)
         setPresentCount(presentCount)
         setTotalDays(presentCount + absentCount)
  
         setUser(data)
    } catch (error) {
      const errMsg = error?.response?.data?.error || error?.message || 'An unexpected error occurred'
      setError(errMsg)
      console.log(errMsg)
    }
 
  }
  console.log('err',error)
  useEffect(()=>{
    getProfileData()
  },[id])

  return   error != null  ?
    <Error message={error} />
  : user ? <> <TopBar/>
    <Container className="py-5">
      {/* Profile Header */}
      <Card className="mb-4 shadow-sm">
        <Card.Body className="d-flex align-items-center">
          <div>
            <h4>{user.firstName}</h4>
            <p className="text-muted mb-1">{user.role}</p>
            <small>ID: {user.empId}</small>
          </div>
        </Card.Body>
      </Card>

      {/* Attendance Summary */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h5 className="mb-3">Attendance Summary</h5>
          <Row className="text-center">
            <Col md={4}>
              <div className="bg-success text-white rounded p-3">
                <h4>{presentCount}</h4>
                <p>Present</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="bg-danger text-white rounded p-3">
                <h4>{absentCount}</h4>
                <p>Absent</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="bg-primary text-white rounded p-3">
                <h4>{totalDays}</h4>
                <p>Total Days</p>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Contact Info */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h5 className="mb-3">Contact Information</h5>
          <Row>
            <Col md={6}><strong>Email:</strong> {user.email}</Col>
            <Col md={6}><strong>Phone:</strong> {user.mobile}</Col>
            <Col md={6}><strong>Department:</strong> {user.department}</Col>
            <Col md={6}><strong>Joining Date:</strong> {user.joinedDate.split('T')[0]}</Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
    </>:<Spinner/>
}

export default ProfilePage;
