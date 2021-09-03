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
    // case DELETELOGINUSER:
    //   let deleteUser = Object.assign({}, state.loginUser)
    //   let deleteCart = state.Cart.slice()
    //   deleteUser = null
    //   deleteCart = []
    //   return { ...state, loginUser: deleteUser, Cart: deleteCart }

    case FETCHCARTITEM:
      let cartItem = state.Cart.slice()
      firebase
      .firestore()
        .collection(`users/${action.loginUser.uid}/carts`)
        .get().then(snapshot => {
          if (snapshot.empty) {
            firebase
            .firestore()
              .collection(`users/${action.loginUser.uid}/carts`)
              .add({
                orderDate: "",
                userName: "",
                mailAddress: "",
                addressNumber: "",
                address: "",
                phoneNumber: "",
                deliveryDate: "",
                deliveryTime: "",
                status: 0,
                cartItemList: []
              }).then(doc => {
                cartItem.push({
                  id: doc.id, cartItem: {
                    orderDate: "",
                    userName: "",
                    mailAddress: "",
                    addressNumber: "",
                    address: "",
                    phoneNumber: "",
                    deliveryDate: "",
                    deliveryTime: "",
                    status: 0,
                    cartItemList: []
                  }
                })
                // console.log(cartItem)
                // return { ...state, Cart: cartItem }
              })
          }
          snapshot.forEach(doc => {
            cartItem.push({ id: doc.id, cartItem: doc.data() })
          }
          )
        })
      return { ...state, Cart: cartItem }
    case FETCHITEM:
      const CurryItem = state.Curry.slice()
      firebase
        .firestore()
        .collection(`product`)
        .get().then(snapshot => {
          snapshot.forEach(doc => {
            CurryItem.push(doc.data())
          })
        })
      return { ...state, Curry: CurryItem }

    default:
      return state
  }
}

export default StoreState;