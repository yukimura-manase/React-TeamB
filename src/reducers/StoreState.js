// Stateを管理するStore => Actionsを受け取ったStateの変更処理をする部門を内部に持っている。
// StateとStateの更新処理 => ファイル単位のuseStateのようなもの。
import { SETLOGINUSER, DELETELOGINUSER, FETCHCARTITEM, FETCHITEM ,REMOVECART, ADDDATA,CURRYCARTITEM} from '../actions/ActionCreator'
import firebase from 'firebase/compat/app'


const initialState = {
  loginUser: null,
  Curry: [],
  Cart: [],
}
console.log(initialState)


export const StoreState = (state = initialState, action) => {

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

            // firebase.firestore()
            // .collection(`users/${state.loginUser.uid}/carts`)
            // .doc('aMZz5VN4TEVzsBoZ3J5j') // 自動ID
            // .update(copyCart) // documentの指定idのやつの中にある一部の値だけ更新

            return {
                cartlist:copyCart
            }
        }

      case CURRYCARTITEM:
        const curryCart = state.Cart.slice()
        curryCart[0].cartItemList.push(action.Cart)
        console.log(curryCart);
        return {...state,Cart: curryCart}



    default:
      return state
  }
}




