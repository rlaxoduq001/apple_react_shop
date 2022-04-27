/* eslint-disable */

import logo from './logo.svg';
import { Navbar ,Container,Nav,NavDropdown} from 'react-bootstrap';
import './App.css';
import { useState } from 'react';
import data from './data.js'
import { Routes, Route, Link } from 'react-router-dom';
import Detail from './Detail.js'

function App() {

  let [ shoes ] = useState(data);
  
  return (
    <div className="App">

      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>

          <Link to="/">홈</Link>
          <Link to="/detail">상세페이지</Link>

        </Container>
      </Navbar>
      


      <Routes>
        <Route path='/' element={
          <>
            <div className='main-bg'></div>
              <div className='container'>
                <div className='row'>
                  {
                    shoes.map( (shoesItem,i) => {
                      return (
                        <ShoesInfo item={ shoesItem } i={i+1} key={i}></ShoesInfo>
                      )
                    })
                  }
                </div>
              </div>
          </>
        }/>
        <Route path='/detail' element={ <Detail/> } />
      </Routes>

      </div>
  );
}

const ShoesInfo = (props) => {
  return (
    <div>
      <div className='col-md-4'>
        <img src={'https://codingapple1.github.io/shop/shoes'+props.i+ '.jpg'} width="80%"/>
        <h4>{props.item.title}</h4>
        <p>{props.item.content}</p>
      </div>
    </div>
  )
}

export default App;
