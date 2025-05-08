import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';
import TopBar from './TopBar';
import { MdModeEditOutline } from "react-icons/md";
import toast from 'react-hot-toast';
import Error from './Error';

const viewAttendance = () =>{

    const [viewAttendance,setViewAttendance ] = useState([])
    const  [selectedValue,setSelectedValue] = useState({})
      const [error,setError] = useState(null)
    
    const date = localStorage.getItem('attendanceDate')

    const getAttendance = async ()=>{

      let editableFlag;

      const selectValues = {}

      try {
        if (!date) {
          alert("Please select a date to view attendance.");
          return;
        }

        const res = await AxiosService.get(`${ApiRoutes.VIEWATTENDANCE.path.replace(':date',date)}`)
        const attendance = res.data.filteredData.map((item)=>({
          ...item,
          editableFlag :false   
        }))
  
      const datas = res.data.filteredData
      
      for(let data of datas){
        selectValues[data.id] = data.status
        }

              
        setViewAttendance(attendance)

        setSelectedValue(selectValues)
    
      } catch (error) {
        setError( error.response.data.message || error.message) 
      }

      
    }

    const handleEdit = async(index)=>{

      const updatedAttendance = [...viewAttendance]
      updatedAttendance[index].editableFlag = true

      setViewAttendance(updatedAttendance)

    }

    const handleUpdate = async(event,index,id)=>{

      const object = event.target

      const updatedAttendance = [...viewAttendance]
      updatedAttendance[index].editableFlag = false
    
      setViewAttendance(updatedAttendance)

      const recordToUpdate = updatedAttendance[index]

      try {
        const res = await AxiosService.put(ApiRoutes.MANAGEATTENDANCE.path,{
          id : recordToUpdate.id,
          fullName : recordToUpdate.fullName,
          status : recordToUpdate.status,
          date : recordToUpdate.date
       },{new:true})
      } catch (error) {
        toast.error(error.message)
      }
     
        
    } 

    const handleChange = (event,index)=>{
      const {name,value} = event.target
      const updatedField = [...viewAttendance]
      updatedField[index][name] = value;
      setViewAttendance(updatedField)
    }

    const handleSelect = (event,index)=>{
      const {name,value} = event.target
      setSelectedValue(event.target.value)
      const updatedField = [...viewAttendance]
      updatedField[index][name] = value;
      setViewAttendance(updatedField)
    }
      
    useEffect (() => {
        getAttendance()
      },[]);
      
    

    return  error ?  
    <Error message={error} />
     :  viewAttendance ? <>
    <TopBar/>
        <Container className="mt-4">
          <h3 className="mb-4">View Report - {date}</h3>

          <Table bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Staff Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {viewAttendance.length > 0 ? viewAttendance.map((staff, index) =>{
                const staffName = `${staff.fullName}`
                const status = `${staff.status}`
                return (
                <tr key={`${index}`}>
                  <td>{index + 1}</td>
                  <td><input readOnly={!staff.editableFlag}  type='text' value={staffName} name='fullName' className='inputField'  onChange={(event)=>handleChange(event,index)}/></td>
                  <td><select disabled={!staff.editableFlag} type='text' name='status' value={staff.status} className='selectField' onChange={(event)=>handleSelect(event,index)}>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  </select>
                  </td>  
                  {staff.editableFlag ? <><td style={{color:"blue"}} className='ps-4'><Button id="updateIcon" className='primary' onClick={(event)=>handleUpdate(event,index,staff.id)}>Update</Button></td></>
                  :<><td style={{color:"blue"}} className='ps-4'><a id="editIcon" href='#' onClick={()=>handleEdit(index)}><MdModeEditOutline/></a></td></>
                  }
               </tr>
   
              )}):(
                <tr>
                  <td colSpan="4" className="text-center">No attendance record found.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Container>
        </> : <Spinner/> 
}

export default viewAttendance