import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'

// 파일 분할
// let user = createSlice({
//   name : 'user',
//   initialState : { name: 'kim', age: 20 },

//   // 수정하는 방법
//   // 함수만들기 -> 요청 -> export 
//   reducers : {
//     changeName( state ) {
//       // return 'john ' + state;
      
//       // array,object
//       state.name = 'park';
//     },
//     // 함수추가 가능
//     increase( state, action ) {
//       // return 'john ' + state;
      
//       // array,object
//       state.age += action.payload;
//     }
//   }
// });
// export let { changeName, increase } = user.actions;

let stock = createSlice({
  name : 'stock',
  initialState : [10,11,12]
});

let cart = createSlice({
  name : 'cart',
  initialState : 
  [
    {id : 0, name : 'White and Black', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1}
  ],
  reducers : {
    changeCount( state, action ) {
      let num = state.findIndex( a => { return a.id === action.payload })
      state[num].count++
    },
    addItem(state, action) {
      state.push(action.payload);
    }
  }
});
export let { changeCount, addItem } = cart.actions;

export default configureStore({
  reducer: {
    user : user.reducer,
    stock : stock.reducer,
    cart : cart.reducer
   }
}) 