import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components';


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


  let [ count , setCount ] = useState(0);
  let divRef = useRef();

  let { id } = useParams();
  let findShoesId = props.shoes.find( x => {
    return x.id == id;
  })

  // useEffect Lifecycle
  useEffect( () => {
    // mount,update시 실행
    console.log("실행");

    console.log(divRef.current);
    setTimeout(() => {
      divRef.current.style.display = 'none';  
    }, 2000);
  })

  return (
    <div className="container">
      
      {/* update시 render*/}
      {count}
      <button onClick={ () => { setCount(count+1) }}>증가</button>

      <div className="alert alert-warning" ref={divRef}>
        2초이내 구매시 할인
      </div>

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
          <button className="btn btn-danger">주문하기</button> 
        </div>
      </div>
    </div> 
  )
}

export default Detail;