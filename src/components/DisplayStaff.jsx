import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';
import TopBar from './TopBar';

const DisplayStaff =  () => {
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState('');
  const [staffs,setStaff] = useState([]);

  const navigate = useNavigate()

  const handleAttendanceChange = (userId, status) => {
    setAttendance({ ...attendance, [userId]: status });
  };

   const fetchStaff = async ()=>{
    const res = await AxiosService.get(ApiRoutes.DISPLAYSTAFF.path)
    const users = res.data.users;

    const staffList = users.filter((user)=> user.role === 'Staff')
    setStaff(staffList)         
    }

   useEffect(()=>{
        fetchStaff()
    },[])

    const handleChangeDate = () =>{
      setAttendance({})
    }

    const handleSubmit = async () => {
     
      try {
        if (!date) {
            alert("Please select a date before submitting attendance.");
            return;
          }

        for (const staff of staffs) {
          const status = attendance[staff._id];
    
          if (!status) {
            alert(`Attendance not marked for ${staff.firstName}`);
            return;
          }
        }
        for (const staff of staffs) {
          const status = attendance[staff._id];

          const data = JSON.stringify({
                  id: staff._id,
                  status,
                  date,
                })

          const updatedAttendance = await AxiosService.post(ApiRoutes.RECORDATTENDANCE.path,data)
          console.log(updatedAttendance) 
        
        }

      
        alert("Attendance submitted successfully.");
       
      } catch (error) {
        console.error("Submission error:", error);
        alert("Something went wrong while submitting attendance.");
      }
    };
      
   

  return <>
  <TopBar/>
    <Container className="mt-4">

      <Row className="mb-3">
        <Col md={4}>
          <Form.Control type="date" value={date} onChange={(e) =>{ const selectedDate = e.target.value;  
                                                                  setDate(selectedDate);
                                                                  localStorage.setItem('attendanceDate',selectedDate)
                                                                 handleChangeDate();
                                                                 }}/>
        </Col>
        <Col md={6} >
        <Button variant="info" onClick={()=>navigate('/view-attendance')} className="ms-2">
          View Attendance
        </Button>
        </Col>
        <Col  md={2}>
      </Col>
      </Row>

      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Student Name</th>
            <th>Present</th>
            <th>Absent</th>
          </tr>
        </thead>
        <tbody>
          {staffs.length > 0 ? staffs.map((staff, index) =>{
            const staffName = `${staff.firstName}  ${staff.lastName}`
            return (
            <tr key={`${staff._id}`}>
              <td>{index + 1}</td>
              <td> {staffName} </td>
              <td>
  <Form.Check 
    type="radio"
    name={`attendance-${staff._id}`}
    id={`present-${staff._id}`}
    onChange={() => handleAttendanceChange(staff._id, 'Present')}
 
    checked={attendance[staff._id] === 'Present'}
    inline
    label="✔"
  />
</td>
<td>
  <Form.Check 
    type="radio"
    name={`attendance-${staff._id}`}
    id={`absent-${staff._id}`}
    onChange={() => handleAttendanceChange(staff._id, 'Absent')}

    checked={attendance[staff._id] === 'Absent'}
    inline
    label="✖"
  />
</td>
            </tr>
          )}):(
            <tr>
              <td colSpan="4" className="text-center">No staff found.</td>
            </tr>
          )}
        </tbody>
      </Table>

      <div className="text-end">
        <Button variant="success" onClick={(e)=>handleSubmit(e)}>Submit Attendance</Button>
      </div>
    </Container>
    </>
};

export default DisplayStaff