import React, { useEffect, useState } from "react";
import AxiosService from "../utils/AxiosService";
import ApiRoutes from "../utils/ApiRoutes";
import { Table, Container } from "react-bootstrap";
import TopBar from './TopBar'

const DisplayEmployee = () => {

    const [employee,setEmployee] = useState([])
  
    const fetchEmployee = async ()=>{
        const res = await AxiosService.get(ApiRoutes.DISPLAYEMPLOYEE.path)
        const employees = res.data.employeeData;
        setEmployee(employees)         
        }
    
       useEffect(()=>{
            fetchEmployee()
        },[])
  return <>
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
    </>
};

export default DisplayEmployee;
