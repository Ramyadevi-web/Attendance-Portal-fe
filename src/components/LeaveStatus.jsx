import React, { useEffect, useState } from 'react';
import { Container, Card, Table, Badge } from 'react-bootstrap';
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';
import TopBar from './TopBar';
import Spinner from './Spinner'
import Error from './Error';

export default function LeaveStatusStatic() {

  const id = sessionStorage.getItem('id')
  const [leaveDatas,setLeaveDatas] = useState([])
   const [error,setError] = useState(null)

  const getStatus = async()=>{

    try {
      const res = await AxiosService.get(ApiRoutes.LEAVESTATUS.path.replace(':id',id))
      const data = res.data.leaveDatas
       setLeaveDatas(data)
    } catch (error) {
      setError( error.response.data.message || error.message) 
    }
     
  }

useEffect( ()=>{
  getStatus()
},[])


  return  error ?  
  <Error message={error} />
   :  leaveDatas ? <>
  <TopBar/>
    <Container className="py-5">
      <Card className="p-4 shadow">
        <h3 className="mb-4 text-center">My Leave Applications</h3>

        <Table striped bordered hover responsive>
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Leave Type</th>
              <th>From</th>
              <th>To</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveDatas.map((leaveData, index) => (
              <tr key={leaveData.id}>
                <td>{index + 1}</td>
                <td>{leaveData.leaveType}</td>
                <td>{leaveData.fromDate}</td>
                <td>{leaveData.toDate}</td>
                <td>{leaveData.reason}</td>
                <td>
                  <Badge bg={getStatusColor(leaveData.status)}>{leaveData.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
    </> : <Spinner/> 
}

function getStatusColor(status) {
  switch (status) {
    case 'Approved': return 'success';
    case 'Rejected': return 'danger';
    case 'Pending': return 'secondary';
    default: return 'dark';
  }
}
