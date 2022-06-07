import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
  name : 'user',
  initialState : { name: 'kim', age: 20 },

  // 수정하는 방법
  // 함수만들기 -> 요청 -> export 
  reducers : {
    changeName( state ) {
      // return 'john ' + state;
      
      // array,object
      state.name = 'park';
    },
    // 함수추가 가능
    increase( state, action ) {
      // return 'john ' + state;
      
      // array,object
      state.age += action.payload;
    }
  }
});
export let { changeName, increase } = user.actions;
export default user;
