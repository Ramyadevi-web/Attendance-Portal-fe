import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { useNavigate ,Link} from 'react-router-dom';
import AxiosService from '../utils/AxiosService.jsx';
import ApiRoutes from '../utils/ApiRoutes.jsx';
import toast from 'react-hot-toast'
import TopBar from './TopBar.jsx';

const ManageUsers = () => {


  let editableFlag;
  const navigate = useNavigate()
 const [users,setUsers] = useState([]);
 const [originalUser,setOriginalUser] = useState([])
 const [selectedValue,setSelectedValue] = useState({})


 const handleSearch = (e)=>{
  const query =  e.target.value.toLowerCase(); 
  
  if(query == ""){
     setUsers(originalUser)
  }
    else{
      const filteredUsers = originalUser.filter((user)=>(user.firstName + " " + user.lastName).toLowerCase().includes(query) 
                                                         || (user.role.toLowerCase().includes(query)))
                                                         console.log('filter',filteredUsers)
        setUsers(filteredUsers)
    }
    
 }

 const handleDelete =  async (id)=>{

  try {
    await AxiosService.delete(ApiRoutes.DELETEEMPLOYEE.path.replace(':id',id))

    toast.success('User deleted successfully')

    setUsers(prev => prev.filter(user => user._id !== id));
    setOriginalUser(prev => prev.filter(user => user._id !== id));
  } catch (error) {
    toast.error(error.message)
  }
  
 }

 const handleEdit = async(id,index)=>{

  try {

    const updatedUser = [...users]
    updatedUser[index].editableFlag = true
      
    console.log('users',updatedUser)
    setUsers(updatedUser)
  } catch (error) {
    toast.error(error.message)
  }
 }

 const handleUpdate = async(id,index)=>{
  const updatedUser = [...users]
  updatedUser[index].editableFlag = false
  setUsers(updatedUser)

  const recordToUpdate = updatedUser[index]

  console.log("recor",recordToUpdate)


  try {
    await AxiosService.put(ApiRoutes.EDITEMPLOYEE.path.replace(':id',id),{
      firstName: recordToUpdate.firstName,
      lastName: recordToUpdate.lastName,
      email:recordToUpdate.email,
      role: recordToUpdate.role
    }) 
  } catch (error) {
    toast.error(error.message)
  }

 }

 const handleChange = (event,index)=>{
  const {name,value} = event.target
  const updatedField = [...users]
  updatedField[index][name] = value;
  setUsers(updatedField)
}


 const handleSelect = (e,index)=>{
  let {name , value} = e.target;
  setSelectedValue(e.target.value)
   const updatedData = [...users]
   updatedData[index][name] = value
   setUsers(updatedData)
 }

 const fetchData = async()=>{

  try {
    const res = await AxiosService.get(ApiRoutes.DISPLAYALLEMPLOYEE.path)
    let data = res.data.users.map((user)=>({
      ...user,
      editableFlag:false
    }))

    for(let item of data){
      selectedValue[item.id] = item.role
    }
  setSelectedValue(selectedValue)
    setUsers(data)
    setOriginalUser(data)
  
  } catch (error) {
    toast.error(error.message)
  }
 }

 

  useEffect(() => {
    fetchData()
  }, []);
 

  return <>
  <TopBar/>
      <Container className="mt-5">
      <Row className="mb-4">
        <Col><h2>Manage Users</h2></Col>
        <Col className="text-end">
          <Button variant="primary" ><Link to = '/add-user' className='links' style={{color :'white'}}>+ Add </Link></Button>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Control type="text" placeholder="Search by name or role" onChange={(e)=>handleSearch(e)}/>
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {users.length > 0 ? (users.map((user,index)=>(
          <tr key={user._id || index} aria-readonly>
            <td>{index + 1}</td>
            <td> {user.editableFlag ? (
            <>
              <input
                type="text"
                value={user.firstName}
                name="firstName"
                onChange={(e) => handleChange(e, index)}
                className="inputField"
              />
              &nbsp;
              <input
                type="text"
                value={user.lastName}
                name="lastName"
                onChange={(e) => handleChange(e, index)}
                className="inputField"
              />
            </>
                ) : (
                  `${user.firstName} ${user.lastName}`
                )}</td>
            <td><input readOnly={!user.editableFlag}  type='text' value={user.email} name='email' className='inputField'  onChange={(event)=>handleChange(event,index)}/></td>
            <td  contentEditable={user.editableFlag}><select disabled={!user.editableFlag} type='text' name='role' value={user.role} className='selectField' onChange={(e)=>handleSelect(e,index)}>
              <option value='Admin'>Admin</option>
              <option value='Manager' >Manager</option>
              <option value='Staff' >Staff</option>
              </select></td>
            <td>
              {user.editableFlag ? <Button  variant="outline-success" size="sm" onClick={()=>handleUpdate(user._id,index)}>Update</Button>:
              <Button  variant="outline-success" size="sm" onClick={()=>handleEdit(user._id,index)}>Edit</Button>}&nbsp; 
              <Button variant="outline-danger" size="sm" onClick={()=>handleDelete(user._id)}>Delete</Button>
            </td>
          </tr>
        ))) : (
          <tr>
            <td colSpan="6" className="text-center">No users found</td>
          </tr>
        )
      }
        
        </tbody>
      </Table>
    </Container>
    </>

};

export default ManageUsers;