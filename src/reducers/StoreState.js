// Stateを管理するStore => Actionsを受け取ったStateの変更処理をする部門を内部に持っている。
// StateとStateの更新処理 => ファイル単位のuseStateのようなもの。
import { SETLOGINUSER, DELETELOGINUSER, FETCHCARTITEM, FETCHITEM ,CURRYCARTITEM} from '../actions/ActionCreator'
import firebase from 'firebase/compat/app'


// const StoreState=()=>{
//   return 100
// }



// // export default StoreState;

// export const initialState1 = {
//   curryList:[
//     {name:'カレー',detail:'カレーです',pic:'/pic/1.jpg',msizePrice:500,lsizePrice:700},
//   ]

// }

// // eslint-disable-next-line import/no-anonymous-default-export
// export default (state = initialState,action) => {
//   switch(action.type){
//     default: 
//     return state
//   }
// } 


const initialState = {
  loginUser: null,
  Curry: [],
  Cart: [],
}
console.log(initialState)

const StoreState = (state = initialState, action) => {
  switch (action.type) {
    case SETLOGINUSER:
      console.log(action.loginUser)
      return { ...state, loginUser: action.loginUser }

    case DELETELOGINUSER:
      return { ...state, loginUser: null, Cart: [] }

    case FETCHCARTITEM:
      let cartItem = state.Cart.slice()
      cartItem = action.Cart
      console.log(cartItem)
      return { ...state, Cart: cartItem }

    case FETCHITEM:
      let CurryItem = state.Curry.slice()
      CurryItem = action.Curry
      console.log(CurryItem)
      return { ...state, Curry: CurryItem }

      //変更あり
      case CURRYCARTITEM:
        const curryCart = state.Cart.slice()
        curryCart[0].cartItem.cartItemList.push(action.Cart)
        console.log(curryCart);
        return {...state,Cart: curryCart}



    default:
      return state
  }
}

export default StoreState;


