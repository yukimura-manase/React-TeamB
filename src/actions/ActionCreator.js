// reducersで更新処理をする際の判別や、処理に使うデータを加工する関数(ActionCreator)の工場
export const ADDTODO = 'addTodo';

export const addTodo = ( name, size, topping, total ) => {
    //astionオブジェクト
    return {
        type: ADDTODO,
        // text: text,
        name: name,
        size: size,
        topping: topping,
        total: total,

        userName: '太郎',
        address: '日本',
        addressNumber: '000-0000',
        deliveryDate: '10/01',
        deliveryTime: 9,
        mailAddress:　'xxx@gmail.com',
        phoneNumber: '000-1234-5678',
        status: 1,
        
    };
};