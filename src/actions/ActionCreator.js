// reducersで更新処理をする際の判別や、処理に使うデータを加工する関数(ActionCreator)の工場
export const SETLOGINUSER = 'setLoginUser';
export const DELETELOGINUSER = 'deleteLoginUser';
export const FETCHITEM = 'fetchItem';
export const FETCHCARTITEM = 'fetchCartItem';
export const CURRYCARTITEM = 'curryCartItem'
export const REMOVECART = 'removeCart';
export const ADDDATA = 'addData';
//export const ADDORDER = 'addOrder';

export const setLoginUser = (user) =>({ // ログインユーザー情報のセット
    type: SETLOGINUSER,
    loginUser:user
})

export const deleteLoginUser = () =>({ // ログインユーザー情報の削除
    type: DELETELOGINUSER,
})

export const fetchItem = (curryItem) =>({
    type: FETCHITEM,
    Curry:curryItem
})

export const fetchCartItem = (cartItem) =>({
    type: FETCHCARTITEM,
    Cart: cartItem
})

export const curryCartItem = (cartItem) => ({
    type: CURRYCARTITEM,
    Cart: cartItem
})
export const removeCart = (index)=>{
    return {
        type:REMOVECART,
        index:index
    }
}

export const addData = ( 
    // orderDate,
    userName,
    mailAddress,
    addressNumber,
    address,
    phoneNumber,
    deliveryDate,
    deliveryTime,
    status
    ) => ({

        type: ADDDATA,
        // orderDate: orderDate,
        userName: userName,
        mailAddress: mailAddress,
        addressNumber: addressNumber,
        address: address,
        phoneNumber: phoneNumber,
        deliveryDate: deliveryDate,
        deliveryTime: deliveryTime,
        status: status,
})

// export const addOrder = (carts2) =>{
//      return {
//         type:ADDORDER,
//         orderCart:carts2
//     }
// }

