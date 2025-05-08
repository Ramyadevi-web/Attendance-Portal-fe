import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';
import TopBar from './TopBar';
import Spinner from './Spinner'
import Error from './Error';

const DisplayHigher =  () => {
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState('');
  const [highers,setHigher] = useState([]);
   const [error,setError] = useState(null)

  const navigate = useNavigate()

  const handleAttendanceChange = (userId, status) => {
    setAttendance({ ...attendance, [userId]: status });
  };

   const fetchStaff = async ()=>{
    const res = await AxiosService.get(ApiRoutes.DISPLAYSTAFF.path)
    const users = res.data.users;

    const higherList = users.filter((user)=> user.role !== 'Staff')
    setHigher(higherList)         
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

        for (const higher of highers) {
          const status = attendance[higher._id];
    
          if (!status) {
            alert(`Attendance not marked for ${higher.firstName}`);
            return;
          }
        }
        for (const higher of highers) {
          const status = attendance[higher._id];

          const data = JSON.stringify({
                  id: higher._id,
                  status,
                  date,
                })

        await AxiosService.post(ApiRoutes.RECORDATTENDANCE.path,data)
        
        }
        alert("Attendance submitted successfully.");
       
      } catch (error) {
        setError(error.message || 'Something went wrong.....')
      }
    };
      
   

  return error ?  
  <Error message={error} />
   :  highers ? <>
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
            <th>Employee Name</th>
            <th>Present</th>
            <th>Absent</th>
          </tr>
        </thead>
        <tbody>
          {highers.length > 0 ? highers.map((higher, index) =>{
            const higherName = `${higher.firstName}  ${higher.lastName}`
            return (
            <tr key={`${higher._id}`}>
              <td>{index + 1}</td>
              <td> {higherName} </td>
              <td>
  <Form.Check 
    type="radio"
    name={`attendance-${higher._id}`}
    id={`present-${higher._id}`}
    onChange={() => handleAttendanceChange(higher._id, 'Present')}
 
    checked={attendance[higher._id] === 'Present'}
    inline
    label="✔"
  />
</td>
<td>
  <Form.Check 
    type="radio"
    name={`attendance-${higher._id}`}
    id={`absent-${higher._id}`}
    onChange={() => handleAttendanceChange(higher._id, 'Absent')}

    checked={attendance[higher._id] === 'Absent'}
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
    </> : <Spinner/> 
};

export default DisplayHigher