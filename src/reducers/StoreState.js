// Stateを管理するStore => Actionsを受け取ったStateの変更処理をする部門を内部に持っている。
// StateとStateの更新処理 => ファイル単位のuseStateのようなもの。
// import { SETLOGINUSER, DELETELOGINUSER, FETCHCARTITEM, FETCHITEM ,REMOVECART, ADDDATA,CURRYCARTITEM,ADDORDER} from '../actions/ActionCreator'
import firebase from 'firebase/compat/app'

import { SETLOGINUSER, DELETELOGINUSER, FETCHCARTITEM, FETCHITEM, REMOVECART, ADDDATA, CURRYCARTITEM,SETCART } from '../actions/ActionCreator'

const initialState = {
  loginUser: null,
  Curry: [],
  Cart: [],
  //orderCart:[]

}

export const StoreState = (state = initialState, action) => {

            // documentの指定idのやつの中にある一部の値だけ更新
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

    //-------------------------------------------------

        case REMOVECART:{
            const copyCart = state.Cart.concat() // コピー
            
            copyCart[0].cartItemList.splice(action.index,1)

            firebase.firestore()
            .collection(`users/${state.loginUser.uid}/carts`)
            .doc(copyCart[0].id) // 自動ID => copyCart[0].id
            .update( {cartItemList:copyCart[0].cartItemList} ) 

            return { ...state,Cart: copyCart}
        
        }

        case CURRYCARTITEM:{
            const curryCart = state.Cart.slice()
            curryCart[0].cartItemList.push(action.Cart)

            if(state.loginUser){
                firebase.firestore()
                .collection(`users/${state.loginUser.uid}/carts`)
                .doc(curryCart[0].id) // curryCart[0].id
                .update( {cartItemList:curryCart[0].cartItemList} )
            }


            return {...state,Cart: curryCart}
        }
    
        default:
            return state
    }
}


  // case ADDDATA:
    //     const data = state.Cart.slice()
    //     const dataObject = {
    //         // orderDate: action.orderDate,
    //         userName: action.userName,
    //         mailAddress: action.mailAddress,
    //         addressNumber: action.addressNumber,
    //         address: action.address,
    //         phoneNumber: action.phoneNumber,
    //         deliveryDate: action.deliveryDate,
    //         deliveryTime: action.deliveryTime,
    //         status: action.status,
    //     }
    
    //     const dataArray = [ ...data, dataObject ]
    //         return { cartItem: dataArray }
    
    

    // case ADDDATA:

    //   const data = state.Cart.slice()
    //   return {...state, cartItem: data }

    
      // const data = state.Cart.slice()
      // const dataObject = {
      //   // orderDate: action.orderDate,
      //   userName: action.userName,
      //   mailAddress: action.mailAddress,
      //   addressNumber: action.addressNumber,
      //   address: action.address,
      //   phoneNumber: action.phoneNumber,
      //   deliveryDate: action.deliveryDate,
      //   deliveryTime: action.deliveryTime,
      //   status: action.status,
      // }

      // const dataArray = [...data, dataObject]
      // return { cartItem: dataArray }