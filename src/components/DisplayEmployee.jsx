import React, { useEffect, useState } from "react";
import AxiosService from "../utils/AxiosService";
import ApiRoutes from "../utils/ApiRoutes";
import { Table, Container } from "react-bootstrap";
import TopBar from './TopBar'
import Spinner from './Spinner'
import Error from './Error';

const DisplayEmployee = () => {

    const [employee,setEmployee] = useState([])
    const [error,setError] = useState(null)
  
    const fetchEmployee = async ()=>{

      try {
        const res = await AxiosService.get(ApiRoutes.DISPLAYEMPLOYEE.path)
        const employees = res.data.employeeData;
          setEmployee(employees)       
      } catch (error) {
          setError(error.message || 'Something went wrong....')
      }  
  }
    
       useEffect(()=>{
            fetchEmployee()
        },[])


  return  error ?  
  <Error message={error} />
   :  employee ? <>
  <TopBar/>
    <Container className="mt-4">
      <h2 className="mb-4">Employee Attendance Summary</h2>
      <Table striped bordered hover>
        <thead>
          <tr className="text-center">
            <th>Employee Name</th>
            <th>Present Days</th>
            <th>Absent Days</th>
          </tr>
        </thead>
        <tbody>
          {employee.map((emp, index) => (
            <tr key={index}  className="text-center">
              <td>{emp.userName}</td>
              <td>{emp.presentCount}</td>
              <td>{emp.absentCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    </> : <Spinner/> 
};

export default DisplayEmployee;
