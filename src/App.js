/* eslint-disable */

import logo from './logo.svg';
import { Navbar ,Container,Nav,NavDropdown} from 'react-bootstrap';
import './App.css';
import { createContext, useState } from 'react';
import data from './data.js'
import { Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import Detail from './routes/Detail.js'
import About from './routes/About.js';
import Event from './routes/Event.js';
import axios from 'axios';

export let Context1 = createContext();

function App() {

  let [ shoes , setShoes] = useState(data);
  let [ 재고 ] = useState([10,11,12]);
  let navigate = useNavigate();
  
  return (
    <div className="App">

      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* navigate(-1) 뒤로가기 */}
              <Nav.Link onClick={ () => { navigate('/') } }>Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <Nav.Link onClick={ () => { navigate('/detail/0') } }>Detail</Nav.Link>
              <Nav.Link onClick={ () => { navigate('/Event') } }>Evnet</Nav.Link>
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
          <button onClick={() => {

            let copy = [...shoes];
            let copy2 = copy.sort( (a,b) => a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1)
            setShoes(copy2);
            
          }}>정렬</button>
        </Container>
      </Navbar>
      


      <Routes>
        <Route path='/' element={
          <>
            <div className='main-bg'></div>
              <div className='container'>
                  {
                    shoes.map( (shoesItem,i) => {
                      return (
                        <Nav.Link onClick={ () => { navigate('/detail/'+i) } } key={i}>
                          <ShoesInfo item={ shoesItem } i={i+1} ></ShoesInfo>
                        </Nav.Link>
                      )
                    })
                  }
              </div>
              <button onClick={() => {
                axios.get('https://codingapple1.github.io/shop/data2.json')
                .then(resp => {
                  console.log(resp);
                  let copy = [...shoes , ...resp.data];
                  setShoes(copy);
                })

                // Promise.all([ 첫번째 요청, 두번째요청 ]).then
                
              }}>더보기</button>
          </>
        }/>
        {/* URL 파라미터 넘기기 (라우터) */}
        <Route path='/detail/:id' element={ 
          <Context1.Provider value={{ 재고, shoes}}>
            <Detail shoes={shoes}/>  
          </Context1.Provider>
        }/>
        
        <Route path='/about' element={ <About/> }>
          <Route path='member' element={ <div>멤버</div> } />
          <Route path='location' element={ <div>위치정보</div> } />
        </Route>

        <Route path='/Event' element={ <About/> }>
          <Route path='one' element={ <div>첫 주문 양배추즙</div> } />
          <Route path='two' element={ <div>생일기념 쿠폰</div> } />
        </Route>

        <Route path='*' element={ <div>404 Page</div> } />
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
