// Stateを管理するStore => Actionsを受け取ったStateの変更処理をする部門を内部に持っている。
// StateとStateの更新処理 => ファイル単位のuseStateのようなもの。
import { SETLOGINUSER, DELETELOGINUSER, FETCHCARTITEM, FETCHITEM } from '../actions/ActionCreator'
import firebase from 'firebase/compat/app'

const initialState = {
  loginUser: null,
  Curry: [],
  Cart: [],
}


const StoreState = (state = initialState, action) => {
  switch (action.type) {
    case SETLOGINUSER:
      let loginUser = state.loginUser
      loginUser = action.loginUser
      return { ...state, loginUser: loginUser }

    case DELETELOGINUSER:
      let deleteUser = Object.assign({}, state.loginUser)
      let deleteCart = state.Cart.slice()
      deleteUser = null
      deleteCart = []
      return { ...state, loginUser: deleteUser, Cart: deleteCart }

    case FETCHCARTITEM:
      let cartItem = []
      console.log(cartItem)
      firebase
      .firestore()
        .collection(`users/${state.loginUser.uid}/carts`)
        .get().then(snapshot => {
          if (snapshot.empty) {
            firebase
            .firestore()
              .collection(`users/${state.loginUser.uid}/carts`)
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
                console.log(cartItem)
                return { ...state, Cart: cartItem }
              })
          }
          snapshot.forEach(doc => {
            cartItem.push({ id: doc.id, cartItem: doc.data() })
            console.log(cartItem)
            return { ...state, Cart: cartItem }
          }
          )
        })
        
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


// state: {
//   login_user: null,
//     shoppingCart: [],
//       //ショッピングカートの表示用リスト
//       cartlist: { },
//   //注文確認画面を表示するためのリスト
//   // orderList: [],
//   orderList: [],
//     //データベースから取得する商品情報を入れるリスト
//     itemList: [],
//       // 詳細画面からカートに入れるを押した際をデータ
//       pickupItem: { },
//   orderedsList: []
// },
// mutations: {
//   setLoginUser(state, user) {
//     state.login_user = user
//   },
//   deleteLoginUser(state) {
//     state.login_user = null
//   },
//   addCartItem(state, { id, cartItem }) {
//     cartItem.id = id;
//     state.cartlist = cartItem
//     console.log(state.cartlist)
//   },
//   addOrderedItem(state, { cartItem }){
//     state.orderedsList.push(cartItem)
//   },
//   addCustomerInfo(state, { CustomerInfo }) {
//     // CustomerInfo.id = id;
//     state.orderList.push(CustomerInfo)
//   },
//   deleteCartItem() {

//   },
//   fetchItem(state, { Item }) {
//     state.itemList.push(Item)
//   },
//   addOrderList(state, carts) {
//     // state.orderList.push(carts)
//     state.orderList = carts
//   },
//   editCartItem(state, cartData1){
//     state.cartlist = cartData1
//   }
// },
// actions: {
//   login() {
//     const google_auth_provider = new firebase.auth.GoogleAuthProvider()
//     firebase.auth().signInWithRedirect(google_auth_provider)
//   },
//   logout() {
//     firebase.auth().signOut();
//   },
//   setLoginUser({ commit }, user) {
//     commit("setLoginUser", user);
//   },
//   deleteLoginUser({ commit }) {
//     commit("deleteLoginUser");
//   },
//   editCartItem({ getters, commit }, pickupItem) {
//     if (getters.uid) {
//       let cartItem = this.state.cartlist
//       cartItem.cartItemList.push(pickupItem)
//       firebase
//         .firestore()
//         .collection(`users/${getters.uid}/carts`)
//         .doc(cartItem.id)
//         .update(cartItem)
//     }
//     else {
      // let cartData1 = {
      //   orderDate: "",
      //   userName: "",
      //   mailAddress: "",
      //   addressNumber: "",
      //   address: "",
      //   phoneNumber: "",
      //   deliveryDate: "",
      //   deliveryTime: "",
      //   status: 0,
      //   cartItemList: []
      // }
//       cartData1.cartItemList.push(pickupItem)
//       commit("editCartItem", cartData1)
//     }
//   },
//   addCustomerInfo({ getters, commit }, CustomerInfo) {
//     if (getters.uid) {
//       firebase
//         .firestore()
//         .collection(`users/${getters.uid}/carts`)
//         .doc(CustomerInfo.id)
//         .update(CustomerInfo)
//         .then(() => {
//           commit("addCustomerInfo", { CustomerInfo })
//         })
//       this.dispatch('setCart')
//     }
//   },
//   deleteCartItem({ getters }, { cart }){
//     if (getters.uid) {
//       firebase
//         .firestore()
//         .collection(`users/${getters.uid}/carts`)
//         .doc(cart.id)
//         .update(cart)
//     }
//   },
//   fecthCartItem({ getters, commit }) {
//     console.log(getters.uid)
//     firebase
//       .firestore()
//       .collection(`users/${getters.uid}/carts`)
//       .get().then(snapshot => {
//         if (snapshot.empty) {
//           this.dispatch('setCart')
//         }
//         snapshot.forEach(doc => {
//           if (doc.data().status === 0) {
//             commit("addCartItem", { id: doc.id, cartItem: doc.data() })
//           }
//         })
//       })
//   },
//   fetchItem({ commit }) {
//     firebase
//       .firestore()
//       .collection(`product`)
//       .get().then(snapshot => {
//         snapshot.forEach(doc => {
//           commit("fetchItem", { Item: doc.data() })
//         })
//       })
//   },
//   addOrderList({ commit }, carts){
//     commit("addOrderList", carts)
//   },
  // setCart({ getters, commit }) {
  //   firebase
  //     .firestore()
  //     .collection(`users/${getters.uid}/carts`)
  //     .add({
  //       orderDate: "",
  //       userName: "",
  //       mailAddress: "",
  //       addressNumber: "",
  //       address: "",
  //       phoneNumber: "",
  //       deliveryDate: "",
  //       deliveryTime: "",
  //       status: 0,
  //       cartItemList: []
      // }).then(doc => {
      //   commit("addCartItem", {
      //     id: doc.id, cartItem: {
      //       orderDate: "",
      //       userName: "",
      //       mailAddress: "",
      //       addressNumber: "",
      //       address: "",
      //       phoneNumber: "",
      //       deliveryDate: "",
      //       deliveryTime: "",
      //       status: 0,
      //       cartItemList: []
      //     }
      //   })
      // })
//   },
//   deleteConfirm({ commit }, id){
//     commit("deleteAction", id)
//   },
//   fetchOrderedItem({ getters, commit }){
//     firebase
//       .firestore()
//       .collection(`users/${getters.uid}/carts`)
//       .get()
//       .then(snapshot => {
//         snapshot.forEach(doc => {
//           if (doc.data().status !== 0) {
//             commit("addOrderedItem", { cartItem: doc.data() })
//           }
//         })

//       })
//   }
// },
// getters: {
//   uid: state => state.login_user ? state.login_user.uid : null,
//     getCurryId: (state) => (id) => state.itemList.find((itemList) => itemList.id === id),
// },
// })