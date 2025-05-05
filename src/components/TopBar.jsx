import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import useLogout from '../hooks/useLogout'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function TopBar() {

    const logout = useLogout()
    const role = sessionStorage.getItem('role')
    const roles = ['Admin','Manager'];
    let id = sessionStorage.getItem('id')

  return ( 
    <Navbar expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand>{roles.includes(role) ? <Link to ={`/profile/${id}`} className='links'>Profile</Link> :<Link to ={`/profile/${id}`} className='links'>My Attendance</Link> }</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">

          {roles.includes(role) ? <><Nav.Link><Link to ='/display-staff' className='links'>Dashboard</Link></Nav.Link></> : <></>}

          {role === 'Staff' ? <><Nav.Link><Link to ='/leave-application' className='links'>Apply for leave</Link> </Nav.Link></>:<></>}
          
          <Nav.Link> {roles.includes(role) ? <><Link to = '/leave-management' className='links'>Leave Management</Link></>
          :<><Link to ='/leave-status' className='links'>Leave Application Status </Link></>} </Nav.Link>
        </Nav>
        <Button variant="primary" onClick={()=>logout()}>Logout</Button>
      </Navbar.Collapse>
     
    </Container>
  </Navbar>
  )
}

export default TopBar
