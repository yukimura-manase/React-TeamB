// reducersで更新処理をする際の判別や、処理に使うデータを加工する関数(ActionCreator)の工場

export const REMOVECART = 'removeCart';

export const removeCart = (index)=>{
    return {
        type:REMOVECART,
        index:index
    }
}