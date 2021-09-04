// Stateを管理するStore => Actionsを受け取ったStateの変更処理をする部門を内部に持っている。
// StateとStateの更新処理 => ファイル単位のuseStateのようなもの。

import { SETLOGINUSER, DELETELOGINUSER, FETCHCARTITEM, FETCHITEM ,REMOVECART, ADDDATA} from '../actions/ActionCreator'
import firebase from 'firebase/compat/app'

const initialStateApp = {

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
            {name: 'カツカレー', pic:' /pic/1.jpg', size: 'M', topping: 'チーズ', number: 1, total:1490}
          ]
        }}
      ],
    cartlist:[ 
        {id:1,itemName:'ロボ玉試作1号機',size:'M',num:1,topping:'ラーメン',total:2150},
        {id:2,itemName:'ロボ玉試作2号機',size:'S',num:5,topping:'ひまわり',total:3400},
        {id:3,itemName:'ロボ玉試作3号機',size:'L',num:8,topping:'ひまわり',total:5500},
    ]
  }


export const StoreState = (state = initialStateApp, action) => {

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

        case REMOVECART:{
            const copyCart = state.cartlist.concat() // コピー
            copyCart.splice(action.index,1)
            console.log('state.loginUser情報')
            console.log(state.loginUser)

            firebase.firestore()
            .collection(`users/${state.loginUser.uid}/carts`)
            .doc('1jQaF5Vc5fmvmtdmsjjw') // 自動ID => cartItemlist.id
            .update({cartItemList:copyCart}) // documentの指定idのやつの中にある一部の値だけ更新

            return {
                cartlist:copyCart
            }
        }

        default:
            return state
    }
}





// deleteCartItem({getters},{cart}){
//     if(getters.uid){
//       firebase
//       .firestore()
//       .collection(`users/${getters.uid}/carts`)
//       .doc(cart.id)
//       .update(cart)
//     }

// eslint-disable-next-line import/no-anonymous-default-export
// export const Cartstate = (state = initialStateCart,action)=>{ // 1.Storeのstate & 2.dispatchで送られてきたActionsの情報を引数に取って、処理をする関数

//     switch(action.type){

        
//         default:
//             return state
//     }

// }


  



// case FETCHCARTITEM:
    //   let cartItem=state.Cart.slice()
    //   firebase
    //   .firestore()
    //   .collection(`users/${state.loginUser.uid}/carts`)
    //   .get().then(snapshot => {
    //     if (snapshot.empty) {
    //       firebase
    //       .firestore()
    //       .collection(`users/${state.loginUser.uid}/carts`)
    //       .add(
    //       cartItem= {
    //         orderDate: "",
    //         userName: "",
    //         mailAddress: "",
    //         addressNumber: "",
    //         address: "",
    //         phoneNumber: "",
    //         deliveryDate: "",
    //         deliveryTime: "",
    //         status: 0,
    //         cartItemList: []
    //       })
    //     }
    //     snapshot.forEach(doc => {
    //         commit("addCartItem", { id: doc.id, cartItem: doc.data() })
    //       }
    //     })
    //   })
    //   return { ...state, loginUser: deleteUser,Cart:deleteCart }



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
  //     }).then(doc => {
  //       commit("addCartItem", {
  //         id: doc.id, cartItem: {
  //           orderDate: "",
  //           userName: "",
  //           mailAddress: "",
  //           addressNumber: "",
  //           address: "",
  //           phoneNumber: "",
  //           deliveryDate: "",
  //           deliveryTime: "",
  //           status: 0,
  //           cartItemList: []
  //         }
  //       })
  //     })
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

