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

const Detail = (props) => {

  let { id } = useParams();
  let findShoesId = props.shoes.find( x => {
    return x.id == id;
  })
  console.log(findShoesId);

  return (
    <div className="container">
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