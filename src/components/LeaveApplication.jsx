import React, { useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';
import toast from 'react-hot-toast';
import TopBar from './TopBar';

 function LeaveApplication() {

    const id = sessionStorage.getItem('id')

  const [form, setForm] = useState({
    leaveType: '',
    fromDate: '',
    toDate: '',
    reason: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setForm({...form,status:"Pending"})
   
    try {
        const res = await AxiosService.post(ApiRoutes.APPLYLEAVE.path.replace(':id',id),form)
        console.log("res",res)
        
        toast.success(res.data.message)  
    } catch (error) {
        toast.error( error.response.data.message || error.message)  
    }
    
  };

  return <>
  <TopBar/>
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: '100%', maxWidth: '500px' }} className="p-4 shadow">
        <h3 className="mb-4 text-center">Leave Application</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="leaveType">
            <Form.Label>Leave Type</Form.Label>
            <Form.Select name="leaveType" value={form.leaveType} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Sick">Sick Leave</option>
              <option value="Casual">Casual Leave</option>
              <option value="Earned">Earned Leave</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="fromDate">
            <Form.Label>From Date</Form.Label>
            <Form.Control type="date" name="fromDate" value={form.fromDate} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="toDate">
            <Form.Label>To Date</Form.Label>
            <Form.Control type="date" name="toDate" value={form.toDate} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="reason">
            <Form.Label>Reason</Form.Label>
            <Form.Control as="textarea" rows={3} name="reason" value={form.reason} onChange={handleChange} />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">Submit</Button>
        </Form>
      </Card>
    </Container>
    </>
}

export default LeaveApplication