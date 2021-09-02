// reducersで更新処理をする際の判別や、処理に使うデータを加工する関数(ActionCreator)の工場


export const SETLOGINUSER = 'setLoginUser';
export const DELETELOGINUSER = 'deleteLoginUser';
export const FETCHITEM = 'fetchItem';
export const FETCHCARTITEM = 'fetchCartItem';
export const REMOVECART = 'removeCart';

export const removeCart = (index)=>{
    return {
        type:REMOVECART,
        index:index
    }
}

export const setLoginUser = (user) =>({ // ログインユーザー情報のセット
    type: SETLOGINUSER,
    loginUser:user
})

export const deleteLoginUser = () =>({ // ログインユーザー情報の削除
    type: DELETELOGINUSER,
})

export const fetchItem = () =>({ // firestoreから商品情報を取ってくる。
    type: FETCHITEM,
})

export const fetchCartItem = () =>({ // firestoreからカート情報を取ってくる。
    type: FETCHCARTITEM,
})


