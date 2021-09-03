// Stateを管理するStore => Actionsを受け取ったStateの変更処理をする部門を内部に持っている。
// StateとStateの更新処理 => ファイル単位のuseStateのようなもの。
import { SETLOGINUSER, DELETELOGINUSER, FETCHCARTITEM, FETCHITEM } from '../actions/ActionCreator'
import firebase from 'firebase/compat/app'

const initialState = {
  loginUser: null,
  Curry: [],
  Cart: [],
}

console.log(initialState)


const StoreState = (state = initialState, action) => {
  switch (action.type) {
    case SETLOGINUSER:
      return { ...state, loginUser: action.loginUser }

    case DELETELOGINUSER:
      return { ...state, loginUser: null, Cart: [] }

    case FETCHCARTITEM:
      let cartItem = state.Cart.slice()
      cartItem = action.Cart
      return { ...state, Cart: cartItem }

    case FETCHITEM:
      let CurryItem = state.Curry.slice()
      CurryItem = action.Curry
      return { ...state, Curry: CurryItem }

    default:
      return state
  }
}

export default StoreState;