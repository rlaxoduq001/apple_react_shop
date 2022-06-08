
import { memo, useState } from 'react';
import {Table} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import { changeName, increase } from './../store/userSlice.js';
import { changeCount } from './../store';



// memo - 재랜더링막기
// props가 변할때만 재렌더링해줌
let Child = memo( function() {
  console.log('재렌더링');
  return <div>자식</div>
})

// 1.useMemo
// function 함수() {
//   return 반복문 10억번
// }

// useMemo , memo => 실행시점의 차이 

function Cart() {

  let state = useSelector( (state) => state);
  let dispatch = useDispatch();

  // memo
  let [ count, setCount ] = useState(0);

  // 2.useMemo
  // 컴포넌트 렌더링시 1회만 실행
  // state 변경할때 실행가능
  // let result = useMemo( () => { return 함수(), [state]})

  return (
    <div>
      
      <Child count={count}></Child>
      <button onClick={() => { setCount(count+1)} }>+</button>

      {state.user.name} {state.user.age}의 장바구니
      <button onClick={ ()=>{
        dispatch(increase(10));
      }}
      >버튼</button>
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>상품명</th>
          <th>수량</th>
          <th>변경하기</th>
        </tr>
      </thead>
      <tbody>
        {
          state.cart.map( (item, i) => {
            return (
              <tr key={i}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.count}</td>
                <td>
                  <button onClick={() => {
                    // dispatch(changeName())
                    dispatch(changeCount( item.id ))
                  }}>+</button>
                </td>
              </tr>
            )
          })
        }

      </tbody>
    </Table> 
    </div>
  )
}

export default Cart;