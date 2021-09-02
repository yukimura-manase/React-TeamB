import React from 'react'
import { removeCart } from '../actions/ActionCreator';
import { useDispatch,useSelector } from 'react-redux';

export const cartSelector = state => { // stateの使いたいデータを持ってくる！
    console.log('cartSlelctor')
    console.log(state)
    return state.Cartstate.cartlist
} 

export const Cart = ()=>{

    const cartlist = useSelector(cartSelector) // useSelectorの引数にtodoSelector関数を渡す。 => Storeのstate情報の一部が引数に入る。

    const dispatch = useDispatch() // useDispatchを呼び出して変数dispatchに格納する。

    //const [cartlist ,]



    //const [total,Tax] = useState()



    const remove = (index)=>{
        
        console.log('dispatch!removeTodo')
        console.log(index)
        dispatch(removeCart(index))
    
    }

    // const tax = ()=>{
    //     total * 0.1
    // }

    return(
        <React.Fragment>
            <h2>ショッピングカート</h2>

            <table border='1'>
                <thead>
                    <tr>
                        <th>
                            <h2>商品名</h2>
                        </th>
                        <th>
                            <h2>サイズ</h2>
                        </th>
                        <th>
                            <h2>数量</h2>
                        </th>
                        <th>
                            <h2>トッピング</h2>
                        </th>
                        <th>
                            <h2>小計(税抜)</h2>
                        </th>
                        <th>
                            <h2>削除</h2>
                        </th>
                    </tr>
                </thead>
                <tbody>
                {
                    cartlist.map( (ailias,index)=>{
                        return (
                        <tr key={ailias.id}>
                            <td>{ailias.itemName}</td>
                            <td>{ailias.size}</td>
                            <td>{ailias.num}</td>
                            <td>{ailias.topping}</td>
                            <td>{ailias.price}</td>
                            <td><button onClick={ ()=>{remove(index)} }>削除</button></td>
                        </tr>
                        )
                    })
                }
                </tbody>
            </table>

        </React.Fragment>
    )
}


