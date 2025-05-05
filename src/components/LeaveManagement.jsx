import React, { useEffect, useState } from "react";
import { Table, Button, Form, Row, Col, Card } from "react-bootstrap";
import TopBar from "./TopBar";
import ApiRoutes from "../utils/ApiRoutes";
import AxiosService from '../utils/AxiosService';
import { use } from "react";

const LeaveManagementAdmin = () => {

  const [leaveRequest,setLeaveRequest] = useState([])

  const fetchRequest = async () => {
    const res = await AxiosService.get(ApiRoutes.LEAVEMANAGEMENT.path)
    const data = res.data.filteredData
    console.log('data',data)
    setLeaveRequest(data)
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
    console.log('up',updatedData)  
  }


  return <>
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
            <td><span className="badge bg-warning text-dark">{request.status}</span></td>
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
    </>
};

export default LeaveManagementAdmin;
