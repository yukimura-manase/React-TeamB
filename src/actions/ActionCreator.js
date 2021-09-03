// reducersで更新処理をする際の判別や、処理に使うデータを加工する関数(ActionCreator)の工場
export const SETLOGINUSER = 'setLoginUser';
export const DELETELOGINUSER = 'deleteLoginUser';
export const FETCHITEM = 'fetchItem';
export const FETCHCARTITEM = 'fetchCartItem';

//Action Creator
export const setLoginUser = (user) =>({
    type: SETLOGINUSER,
    loginUser:user
})

export const deleteLoginUser = () =>({
    type: DELETELOGINUSER,
})

export const fetchItem = () =>({
    type: FETCHITEM,
})

export const fetchCartItem = (user) =>({
    type: FETCHCARTITEM,
    loginUser:user
})


