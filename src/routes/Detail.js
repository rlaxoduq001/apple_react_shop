import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Nav } from "react-bootstrap";
import { Context1 } from "./../App.js";
import { addItem } from './../store';

// styled-components!

// let YellowBtn = styled.button`
//   background : ${ props => props.bg };
//   color : ${ props => props.bg == 'blue' ? 'white' : 'black'};
//   padding : 10px;
// `

// let Box = styled.div`
//   background : grey;
//   paading : 20px;
// `

// 가져와서 사용가능
// let NewBtn = styled.button(YellowBtn)``

///////////////////////////////////////////////////////

// Lifecycle class문법

// class Detail2 extends React.Component {
//   componentDidMount() {
//     // 컴포넌트 mount시 실행
//   }
//   componentDidUpdate() {
//     // 컴포넌트 update시 실행
//   } 
//   componentWillUnmount() {
//     // 컴포넌트 unmount시 실행
//   }
// }

const Detail = (props) => {

  let dispatch = useDispatch();

  let {재고, shose} = useContext(Context1);

  let [ count , setCount ] = useState(0);
  let divRef = useRef();

  let { id } = useParams();
  let findShoesId = props.shoes.find( x => {
    return x.id == id;
  })

  let [ alert , setAlert] = useState(true);
  let [ inputVal , setInputVal ] = useState('');
  let [ tab , setTab] = useState(0);


  // 최근본상품
  useEffect( () => {
    console.log(findShoesId.id);
    
    let getShoesId = localStorage.getItem('watched');
    getShoesId = JSON.parse(getShoesId);
    getShoesId.push(findShoesId.id)
    getShoesId = new Set(getShoesId);
    getShoesId = Array.from(getShoesId);
    localStorage.setItem('watched', JSON.stringify(getShoesId))
  }, [])



  // useEffect Lifecycle
  useEffect( () => {
    // mount,update시 실행
    // console.log("실행");

    // console.log(divRef.current);
    // setTimeout(() => {
    //   divRef.current.style.display = 'none';  
    // }, 2000);

    let a = setTimeout(() => { setAlert(false) }, 2000);
    // console.log("2");

    numberCheck( inputVal );

    // useEffect 실행되기 전 작동
    return() => {
      // 기존 타이머 제거
      // console.log("1");
      clearTimeout(a);
    }
  }, [inputVal])

  const onChange = (e) => {
    setInputVal(e.target.value);
  }

  const numberCheck = (val) => {
    if( !val.replace(/[^0-9]/g, '') ){
      console.log(val);
      console.log("숫자만 입력");
    }else {
      console.log(val);
      console.log("222");
    }
  }

  // userEffect !
  // useEffect(()=> {}) 1. 재랜더링 마다 코드실행하고 싶으면
  // useEffect(()=> {}, []) 2. mount시 1회 코드실행하고 싶으면
  // useEffect(()=> {
  //   return () => {
  //     3. unmount시 1회 코드실행하고 싶으면
  //   }
  // }) 
  // 4. userEffect 실행전에 뭔가 실행하려면 return
  // useEffect(()=> {}, [count]) 5. 특정 state 변경시에만 실행

  return (
    <div className="container">
      
      {/* update시 render*/}
      {count}
      <button onClick={ () => { setCount(count+1) }}>증가</button>
      {
        alert == true ? 
        
        <div className="alert alert-warning" ref={divRef}>
          2초이내 구매시 할인
        </div>
        :
        null
      }

      <input type="text" onChange={onChange} value={inputVal}></input>      
      <div>{inputVal}</div>
      {/* <div className="alert alert-warning" ref={divRef}>
        2초이내 구매시 할인
      </div> */}

      {/* <Box>
        <YellowBtn bg="blue">버튼</YellowBtn>
        <YellowBtn bg="yellow">버튼</YellowBtn>
      </Box> */}

      <div className="row">
        <div className="col-md-6">
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
        </div>

        <div className="col-md-6">
          <h4 className="pt-5">{props.shoes[id].title}</h4>
          <p>{props.shoes[id].content}</p>
          <p>{props.shoes[id].price}</p>
          <button className="btn btn-danger" onClick={() =>{
            console.log(props.shoes[id]);
            dispatch( addItem( {id:2, name: 'grey yordan', count: 1} ) );
          }}>주문하기</button> 
        </div>
      </div>

    <Nav variant="tabs"  defaultActiveKey="link0">
      <Nav.Item>
        <Nav.Link onClick={() => {setTab(0)}} eventKey="link0">버튼0</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => {setTab(1)}} eventKey="link1">버튼1</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => {setTab(2)}} eventKey="link2">버튼2</Nav.Link>
      </Nav.Item>
    </Nav>


    <TabContent shoes={props.shoes} tab={tab} />

    </div> 
  )
}

function TabContent({tab,shoes}) {
  // if( props.tab === 0 ) {
  //   return <div>내용0</div>
  // }
  // if( props.tab === 1 ) {
  //   return <div>내용1</div>
  // }
  // if( props.tab === 2 ) {
  //   return <div>내용2</div>
  // }

  // useMemo
  let {재고, shose} = useContext(Context1);

  let [fade , setFade] = useState('');
  useEffect( () => {
    setTimeout(() => {setFade('end')}, 100)
    return () => {
      setFade('');
    }
  }, [tab])

  return (
    <div className={'start '+fade }>
      
      { [<div>{shoes[0].title}</div>, <div>{재고}</div>, <div>내용2</div>][tab] }
    </div>
  )
}

export default Detail;