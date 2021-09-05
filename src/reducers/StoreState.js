// Stateを管理するStore => Actionsを受け取ったStateの変更処理をする部門を内部に持っている。
// StateとStateの更新処理 => ファイル単位のuseStateのようなもの。
import { SETLOGINUSER, DELETELOGINUSER, FETCHCARTITEM, FETCHITEM, ADDDATA } from '../actions/ActionCreator'
import firebase from 'firebase/compat/app'

const initialState = {
  loginUser: null, 
  Curry: [],
  Cart: [
    { cartItem: {
      orderDate: "",
      userName: "",
      mailAddress: "",
      addressNumber: "",
      address: "",
      phoneNumber: "",
      deliveryDate: "",
      deliveryTime: "",
      status: 0,
      //カートのカレー情報 仮置き
      cartItemList: [
        {name: 'カツカレー', pic:'/pic/1.jpg', size: 'M', topping: 'チーズ', number: 1, total:1490}
      ]
    }}
  ],

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


      case ADDDATA:
        const data = state.Cart.slice()
        const dataObject = {
          // orderDate: action.orderDate,
          userName: action.userName,
          mailAddress: action.mailAddress,
          addressNumber: action.addressNumber,
          address: action.address,
          phoneNumber: action.phoneNumber,
          deliveryDate: action.deliveryDate,
          deliveryTime: action.deliveryTime,
          status: action.status,
        }

        const dataArray = [ ...data, dataObject ]
            return { cartItem: dataArray }


    default:
      return state
  }
}

export default StoreState;
