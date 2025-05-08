import React, { useEffect, useState } from "react";
import { Table, Button, Badge} from "react-bootstrap";
import TopBar from "./TopBar";
import ApiRoutes from "../utils/ApiRoutes";
import AxiosService from '../utils/AxiosService';
import Spinner from './Spinner'
import Error from './Error';

const LeaveManagement = () => {

  const [leaveRequest,setLeaveRequest] = useState([])
  const [error,setError] = useState(null)

  const role = sessionStorage.getItem('role')

  const fetchRequest = async () => {
    let res='' ;

    try {
      if(role === 'Manager'){
        res = await AxiosService.get(ApiRoutes.LEAVEMANAGEMENT.path)
     }else if(role === 'Admin'){
        res = await AxiosService.get(ApiRoutes.DISPLAYHIGHERLEAVEREQUEST.path)
     }
    
     const data = res.data.filteredData
  
     setLeaveRequest(data)
    } catch (error) {
      setError( error.response.data.message || error.message) 
    }
    
  }

  useEffect(()=>{
       fetchRequest()
  },[])

  const handleAction = async (e,id,userIndex,leaveIndex)=>{
    const updatedRequests = [...leaveRequest]; // shallow copy of main array
    const user = { ...updatedRequests[userIndex] }; // shallow copy of user object
    const updatedLeaveData = [...user.leaveData]; // copy leaveData array
  
    const updatedLeave = { ...updatedLeaveData[leaveIndex] }; // copy specific leave object
    updatedLeave.status =`${e.target.value === 'Approve' ? e.target.value+'d' : e.target.value+'ed'}`; // update status
  
    updatedLeaveData[leaveIndex] = updatedLeave;
    user.leaveData = updatedLeaveData;
    updatedRequests[userIndex] = user
    setLeaveRequest(updatedRequests)
    const updatedData = await AxiosService.put(ApiRoutes.ACTION.path.replace(':id',id),{
                                                        leaveIndex:leaveIndex,
                                                            status:updatedLeave.status
                                                        })
 
  }

  const getStatusColor = (status) =>{
    switch(status){
      case 'Pending': return 'secondary'
      case 'Approved': return 'success'
      case 'Rejected': return 'danger'
    }
  }


  return  error ?  
  <Error message={error} />
   :  leaveRequest ? <>
  <TopBar/>
    {leaveRequest.length > 0 ? <div className="container mt-4">
      <h2 className="mb-4">Leave Management - Admin Panel</h2>


      {/* <Card className="mb-4 p-3">
        <Form>
          <Row>
            <Col md={3}>
              <Form.Group controlId="searchEmployee">
                <Form.Label>Employee Name</Form.Label>
                <Form.Control type="text" placeholder="Search by name" />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="statusFilter">
                <Form.Label>Status</Form.Label>
                <Form.Select>
                  <option value="">All</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3} className="d-flex align-items-end">
              <Button variant="primary" className="w-100">
                Apply Filter
              </Button>
            </Col>
          </Row>
        </Form>
      </Card> */}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Employee Name</th>
            <th>Leave Type</th>
            <th>From</th>
            <th>To</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
         { leaveRequest.flatMap((user , index) =>
          (user.leaveData).map((request,subIndex)=>
          (<tr key={`${index}-${subIndex}`}>
            <td>{index + 1}</td>
            <td>{user.firstName}</td>
            <td>{request.leaveType}</td>
            <td>{request.fromDate.split("T")[0]}</td>
            <td>{request.toDate.split("T")[0]}</td>
            <td>{request.reason}</td>
            <td> <Badge bg={getStatusColor(request.status)}>{request.status}</Badge></td>
            <td>
              <Button variant="success" size="sm" value = 'Approve' className="me-2" onClick={(e)=>handleAction(e,user._id,index,subIndex)}>Approve</Button>
              <Button variant="danger" size="sm"  value = 'Reject' onClick={(e)=>handleAction(e,user._id,index,subIndex)}>Reject</Button>
            </td>
          </tr>)
        ))
        }
        </tbody>
      </Table>
    </div> : <div>No Leave request found</div>}
    </> : <Spinner/>
};

export default LeaveManagement;
