// Stateを管理するStore => Actionsを受け取ったStateの変更処理をする部門を内部に持っている。
// StateとStateの更新処理 => ファイル単位のuseStateのようなもの。
import { ADDTODO } from '../actions/ActionCreator';

const initialState = {
  carts: [{
    name: 'カリー',
    size: 'M',
    topping: 'チーズ',
    total: 2000,

    userName: '太郎',
    address: '日本',
    addressNumber: '000-0000',
    deliveryDate: '10/01',
    deliveryTime: 9,
    mailAddress:　'xxx@gmail.com',
    phoneNumber: '000-1234-5678',
    status: 1,


  }]
}

export const StoreState = ( state = initialState, action ) => {
    // eslint-disable-next-line default-case
    switch ( action.type ) {
        case ADDTODO:
            const cart = state.carts.slice()
            let id = 0
            for ( let a = 0; a < cart.length; a++){
                id = a
            }

            const cartObject = {
                id: id,
                name: action.name,
                size: action.size,
                topping: action.topping,
                total: action.total,

                userName: action.userName,
                address: action.address,
                addressNumber: action.addressNumber,
                deliveryDate: action.deliveryDate,
                deliveryTime: action.deliveryTime,
                mailAddress:　action.mailAddress,
                phoneNumber: action.phoneNumber,
                status:1,
            }

            const cartArray = [ ...cart, cartObject ]
            return { carts: cartArray }
    }
}
