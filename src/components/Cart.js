import React, {useState,useEffect} from 'react'
import { removeCart } from '../actions/ActionCreator';
import { useDispatch,useSelector } from 'react-redux';
import {useHistory} from "react-router-dom";

// 1.Redux-Storeのstateのカートに商品情報が入っていない場合
// 「カートに商品がありません」というメッセージのみを表示する
//   この時、カート内情報、消費税、ご注文金額合計、
//    注文に進むボタンは全て非表示にする


// 2.DBイベント処理「カート内の指定商品を削除」を発生させる。
 //=>DBのカート情報(cartsのcartItemList)そのものを更新(update)



 export const loginSelector = state=>{ // Storeのログインユーザー情報
     console.log('loginSelector')
     console.log(state)
     console.log(state.StoreState.loginUser)
    return state.StoreState.loginUser
}


export const cartSelector = state => { // Storeのカート情報
    console.log('cartSelector')
    console.log(state)
    console.log(state.StoreState.cartlist.length)
    return state.StoreState.cartlist
} 



export const Cart = ()=>{

    const user = useSelector(loginSelector)

    const cartlist = useSelector(cartSelector) // useSelectorの引数にcartSelector関数を渡す。 => Storeのstate情報の一部が引数に入る。


    const history = useHistory(); // useHistory => 画面の表示履歴のすべてのデータを持っているhistoryオブジェクトを呼び出し格納する。
    const handleLink = path =>history.push(path);

    
    const dispatch = useDispatch() // useDispatchを呼び出して変数dispatchに格納する。


    console.log('ログインユーザーはいるか？');
    console.log(user)


    //console.log(Object.keys(user).length)

    //const [login_user , setUser] = useState({}) // ログインユーザーのstate



    

    // const [carts ,setCart] = useState([])
    // console.log(cartlist)
    //         setCart(cartlist)
    //         console.log(carts)
    //const [cartObject,setCart2] = useState({})



    // useEffect( 
    //     ()=>{
    //         console.log('useEffect')

    //         if(!Object.keys(login_user).length){
    //             console.log('ログインしていない')
    //             setUser({})
    //         } else if (Object.keys(login_user).length){
    //             console.log('ログインしている')
    //             setUser(user)
    //         }


    //     },[])

    
    const totalTax = ()=>{ // 消費税の合計を計算
        console.log('totalTax')
        let tax = []
        cartlist.forEach(cart => {
            // console.log('totalTaxのcart')
            // console.log(cart)
            tax.push(cart.total * 0.1)
        })

        // console.log('forEach完了後のtax配列')
        // console.log(tax)

        let totalTax = tax.reduce( (sum,currentVal ) => {
            return sum + currentVal;
        },0) // 初期値を設定している。

        // console.log('totalTax')
        // console.log(totalTax)
        return totalTax
    }

     const sumTotalPlice = ()=>{ // 小計金額(total)ごとの消費税分を計算。
        console.log('sumTotalPlice')
        let taxInclude = []
        cartlist.forEach(cart => {
        taxInclude.push(cart.total * 1.1)
        })
        let totalTaxIncludes = taxInclude.reduce( (sum,currentVal) => {
            return sum + currentVal;
        },0)

        return Math.floor(totalTaxIncludes)
}

    // const [userState , setUser] = useState({})

    // const checkLogin = (user) =>{
        
    //     if(!Object.keys(user).length){
    //         console.log('home')
    //        return <button onClick={ ()=>{handleLink('/')} }>注文に進む</button> 
    //     } else if (user){
    //         console.log('buyhistory')
    //        return <button onClick={ ()=>{handleLink('/buyhistory')} }>注文に進む</button>
    //     }
    // }

    const remove = (index)=>{
        
        console.log('dispatch!removeTodo')
        console.log(index)
        dispatch(removeCart(index))
    
    }


    return(
        <React.Fragment>
            <h2>ショッピングカート</h2>

            { !Object.keys(cartlist).length ? 'カートに商品がありません！':
            <div>
            
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
                                <td>{ailias.total}</td>
                                <td><button onClick={ ()=>{remove(index)} }>削除</button></td>
                            </tr>
                            )
                        })
                    }
                    </tbody>
                </table>


                <div>消費税：{ totalTax() }円</div>
                <div>ご注文金額合計：{ sumTotalPlice() }円(税込)</div>
                {/* {checkLogin()} */}
                <div>
                    {/* <button onClick={ ()=>{handleLink('/buyHistory')} }>注文に進む！</button> */}

                    {/* {   (()=>{ // ログインしていれば、注文に進む！ ログインしていなければ、まずはログイン！
                            if(user){
                                return( <button onClick={ ()=>{handleLink('/buyhistory')} }>注文に進む！</button> )
                            } else  {
                                return( <button onClick={ ()=>{handleLink('/')} }>まずはログイン！</button>  )
                            }
                            }
                        )()
                    } */}

                {   
                     (user === null || user === undefined ) || !Object.keys(user).length ?
                    <button onClick={ ()=>{handleLink('/')} }>まずはログイン！</button> :
                    <button onClick={ ()=>{handleLink('/buyHistory')} }>注文に進む！</button>
                }
                </div>
            
            </div>
            }
</React.Fragment>
    )
}


//if(user === undefined)

// {carts ? : <h2>カートに商品がありません！</h2>}

//checkLogin()



