// Stateを管理するStore => Actionsを受け取ったStateの変更処理をする部門を内部に持っている。
// StateとStateの更新処理 => ファイル単位のuseStateのようなもの。
import { SETLOGINUSER, DELETELOGINUSER, FETCHCARTITEM, FETCHITEM ,REMOVECART, ADDDATA,CURRYCARTITEM} from '../actions/ActionCreator'
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
            const copyCart = state.Cart.concat() // コピー
            //console.log(copyCart)
            //copyCart.splice(action.index,1)

            // console.log('state.loginUser情報')
            // console.log(state.loginUser)
            copyCart[0].cartItem.splice(action.index,1)

            firebase.firestore()
            .collection(`users/${state.loginUser.uid}/carts`)
            .doc(copyCart[0].id) // 自動ID => copyCart[0].id
            .update( {cartItemList:copyCart[0].cartItemList} ) 

            // documentの指定idのやつの中にある一部の値だけ更新

            return {...state,Cart: copyCart}
        }

      case CURRYCARTITEM:
        console.log(state)
        console.log('action.Cart')
        console.log(action.Cart)

        //const curryCart = state.Cart.cartItemList.slice() // ノーログイン
        const curryCart = state.Cart.slice() // ログイン

        console.log('curryCart')
        console.log(curryCart)

        // console.log('curryCart[0].cartItem')
        // console.log(curryCart[0].cartItem)

        // console.log('curryCart[0].cartItem.cartItemList')
        // console.log(curryCart[0].cartItem.cartItemList) // Cart情報
        

        //curryCart.push(action.Cart) // ノーログイン

        curryCart[0].cartItemList.push(action.Cart) // ログイン

        // console.log('Push後のcurryCart')
        // console.log(curryCart);
        // console.log(curryCart[0].id)

        if(state.loginUser){
            firebase.firestore()
            .collection(`users/${state.loginUser.uid}/carts`)
            .doc(curryCart[0].id) // curryCart[0].id
            .update( {cartItemList:curryCart[0].cartItemList} )
        }


        return {...state,Cart: curryCart}



    default:
      return state
  }
}

// データ構造
//     Cart[
            // {
                // cartItem: {
                    //         cartItemList: [
                        //             {name: 'カツカレー', pic:' /pic/1.jpg', size: 'M', topping: 'チーズ', number: 1, total:1490}
                        //     ],
                    //          
                    //         orderDate: "",
                    //         userName: "",
                    //         mailAddress: "",
                    //         addressNumber: "",
                    //         address: "",
                    //         phoneNumber: "",
                    //         deliveryDate: "",
                    //         deliveryTime: "",
                    //         status: 0,

                    
            //     }
            // }
    //  ]

