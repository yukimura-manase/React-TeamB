// Stateを管理するStore => Actionsを受け取ったStateの変更処理をする部門を内部に持っている。
// StateとStateの更新処理 => ファイル単位のuseStateのようなもの。
// import { SETLOGINUSER, DELETELOGINUSER, FETCHCARTITEM, FETCHITEM ,REMOVECART, ADDDATA,CURRYCARTITEM,ADDORDER} from '../actions/ActionCreator'
import firebase from 'firebase/compat/app'

import { SETLOGINUSER, DELETELOGINUSER, FETCHCARTITEM, FETCHITEM, REMOVECART, ADDDATA, CURRYCARTITEM,SETCART, ADDLIKE,REMOVELIKE } from '../actions/ActionCreator'

const initialState = {
  loginUser: null,
  Curry: [],
  Cart: [],

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
            console.log('fetchcartitem')
            console.log(action);
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
            console.log(curryCart)
            curryCart[0].cartItemList.push(action.Cart)

            if(state.loginUser){
                firebase.firestore()
                .collection(`users/${state.loginUser.uid}/carts`)
                .doc(curryCart[0].id) // curryCart[0].id
                .update( {cartItemList:curryCart[0].cartItemList} )
            }


            return {...state,Cart: curryCart}
        }

        case ADDLIKE:{
            const copyCart = state.Cart.slice()
            copyCart[0].likeItemList.push(action.likeCurry)

            firebase.firestore()
                .collection(`users/${state.loginUser.uid}/carts`)
                .doc(copyCart[0].id)
                .update( {likeItemList: copyCart[0].likeItemList} )
            
            return {...state,Cart: copyCart}
        }

        case REMOVELIKE:{
            
            const copyCart = state.Cart.concat()
            copyCart[0].likeItemList.splice(action.index,1)

            firebase.firestore()
            .collection(`users/${state.loginUser.uid}/carts`)
            .doc(copyCart[0].id) // curryCart[0].id
            .update( {likeItemList: copyCart[0].likeItemList} )

            return { ...state,Cart: copyCart}
        
        }
    
        default:
            return state
    }
}
