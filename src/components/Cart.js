import React, {useState,useEffect} from 'react'
import { removeCart } from '../actions/ActionCreator';
import { useDispatch,useSelector } from 'react-redux';
import {useHistory} from "react-router-dom";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// 1.Redux-Storeのstateのカートに商品情報が入っていない場合
// 「カートに商品がありません」というメッセージのみを表示する
//   この時、カート内情報、消費税、ご注文金額合計、
//    注文に進むボタンは全て非表示にする


// 2.DBイベント処理「カート内の指定商品を削除」を発生させる。
 //=>DBのカート情報(cartsのcartItemList)そのものを更新(update)



 export const loginSelector = state=>{ // Storeのログインユーザー情報
     console.log('loginSelector')
     //console.log(state)
     console.log(state.StoreState.loginUser)
    return state.StoreState.loginUser
}


export const cartSelector = state => { // Storeのカート情報
    // console.log('cartSelector')
    // console.log(state)
    // console.log(state.StoreState.cartlist.length)
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

    

    useEffect(
        ()=>{
            console.log('useEffect')
            // if(){

            // }
            
            
        },[]
    )
    // const checkLogin = ()=>{
    //     if(!user){ return ( <button onClick={ ()=>{login()} }>まずはログイン！</button> ) }
    //      else { <button onClick={ ()=>{handleLink('/buyHistory')} }>注文に進む！</button> } 
    // }


    //console.log(Object.keys(user).length)

    //const [login_user , setUser] = useState(user) // ログインユーザーのデータを保持する！

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
        //console.log('totalTax')
        let tax = []
        cartlist.forEach(cart => {
            tax.push(cart.total * 0.1)
        })

        let totalTax = tax.reduce( (sum,currentVal ) => {
            return sum + currentVal;
        },0) // 初期値を設定している。
        return totalTax
    }

     const sumTotalPlice = ()=>{ // 小計金額(total)ごとの消費税分を計算。
        //console.log('sumTotalPlice')
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

    

    const remove = (index)=>{
        
        console.log('dispatch!removeTodo')
        console.log(index)
        dispatch(removeCart(index))
    
    }

    const login=()=>{
        const google_auth_provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithRedirect(google_auth_provider)
        console.log('ログイン')
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
                <div>
                    {/* {checkLogin()} */}
                    {
                        !user ?
                        <button onClick={ ()=>{login()} }>まずはログイン！</button>:
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

//  {/* <button onClick={ ()=>{handleLink('/buyHistory')} }>注文に進む！</button> */}

//                     {/* {   (()=>{ // ログインしていれば、注文に進む！ ログインしていなければ、まずはログイン！
//                             if(user){
//                                 return( <button onClick={ ()=>{handleLink('/buyhistory')} }>注文に進む！</button> )
//                             } else  {
//                                 return( <button onClick={ ()=>{handleLink('/')} }>まずはログイン！</button>  )
//                             }
//                             }
//                         )()
//                     } */}

//  {/* {   
//                      (login_user === null || login_user === undefined ) || !Object.keys(login_user).length ?
//                     <button onClick={ ()=>{handleLink('/')} }>まずはログイン！</button> :
//                     <button onClick={ ()=>{handleLink('/buyHistory')} }>注文に進む！</button>
//                 } */}
