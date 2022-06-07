
import {Table} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import { changeName, increase } from './../store/userSlice.js';
import { changeCount } from './../store';

function Cart() {

  let state = useSelector( (state) => state);
  console.log(state);

  let dispatch = useDispatch();

  return (
    <div>

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