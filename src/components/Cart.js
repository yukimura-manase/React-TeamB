import React, {useState,useEffect} from 'react'
import { removeCart } from '../actions/ActionCreator';
import { useDispatch,useSelector } from 'react-redux';
import {useHistory} from "react-router-dom";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const loginSelector = state=>{ // Storeのログインユーザー情報
     console.log('loginSelector')
     //console.log(state)
     console.log(state.StoreState.loginUser)
    return state.StoreState.loginUser
}


const cartSelector = state => { // Storeのカート情報
    console.log('cartSelector')
    console.log(state)
    console.log(state.StoreState.Cart)
    return state.StoreState.Cart
}

const currySelector = state => {
    console.log('currySelector')
    console.log(state.StoreState.Curry)
    return state.StoreState.Curry
}

export const Cart = ()=>{

    const user = useSelector(loginSelector)

    const cartlist = useSelector(cartSelector) // useSelectorの引数にcartSelector関数を渡す。 => Storeのstate情報の一部が引数に入る。
    console.log('cartlist')
    console.log(cartlist)

    const currylist = useSelector(currySelector)
    console.log('currylist')
    console.log(currylist)

    const history = useHistory(); // useHistory => 画面の表示履歴のすべてのデータを持っているhistoryオブジェクトを呼び出し格納する。
    const handleLink = path =>history.push(path);
    const dispatch = useDispatch() // useDispatchを呼び出して変数dispatchに格納する。


    console.log('ログインユーザーはいるか？');
    console.log(user)

    const undefinedCheck = ()=>{  // undefinedだったら再度、user情報をsetしたい！
        if(user === undefined){
            console.log('undefinedCheck')
            const google_auth_provider = new firebase.auth.GoogleAuthProvider()
            firebase.auth().signInWithRedirect(google_auth_provider)
        }
    }

    

   const 
   [ currys, setCurry] = useState([]),
   [ carts, setCart ] = useState([]),
   [ carts2 , setCart2] = useState([])


    useEffect(
        ()=>{
            console.log('useEffect')
            console.log(cartlist)

            currylist.length !==0 && setCurry(currylist)

            cartlist.length !== 0 &&  setCart(cartlist[0].cartItemList)


            //無限レンダリングが起きてしまっている・・・
            if( cartlist.length !== 0 && currylist.length !==0 ){

                console.log('cartIdList');
                const cartIdList =  carts.map( cart => cart.id) //カート内の商品のIDの配列を生成
                console.log(cartIdList) // [10, 13, 11] idのリストを作る！

                let newCurry = currys.filter( curry => {

                    let idMatch = cartIdList.find(id => id === curry.id) // idリストの中身と一つ一つ

                    return curry.id === idMatch
                })

                console.log('newCurry')
                console.log(newCurry) // idが一致する商品情報 => 名前・写真 を取り出してCartに追加 or newCurryにCartをconcatまたはスプレッド構文

                const mergeArray = [] // 入れ物用意

                newCurry.forEach(curry => {

                    let idMatch = carts.find( cart => cart.id === curry.id) // idが一致するものを一つ格納！
                    console.log(idMatch)
                    
                    const merged = {...curry,...idMatch}
                    console.log(merged)
                
                    
                    mergeArray.push(merged)
                })
                console.log('mergeArray')
                console.log(mergeArray)

                cartlist.length !== 0 && setCart2(mergeArray)

            }

            

            
            // console.log(carts)
            // console.log(carts[0])
            // console.log(currys)

            // cartsとcurrysのidを比較、一致するオブジェクトをcurrysから取り出して、cartsの該当オブジェクトと合成する。
            // =>  スプレッド構文

            

        },[cartlist,currylist,carts,currys])



            





            //  //カート内の商品のIDと一致する値を取り出す。
            // console.log(cartId)

            // const getCurryId = currys.find( curry => curry.id === cartId)
            // console.log(getCurryId)


            // ---------------------------------------------------------------
            // const cartId =  carts.find( cart => cart.id)
            // console.log('cartId');
            // console.log(cartId);
            // //console.log(cartId.id);

            // const newCurryList = currys.filter( (curry) => {
            //     const cartId =  carts.find( cart => cart.id)

            //     return curry.id === cartId.id
            // })
            // console.log('newCurryList')
            // console.log(newCurryList)
            // ----------------------------------------------------------------



            // let curryId = currys.forEach(curry => {
            //    return curry.id
            // })
            // console.log(curryId)


            // const nameImageGet = currys.filter(curry => {
            //     if(curry.id === Number(cartId) ){
            //         return curry.name
            //     } 
            // })
            // console.log(nameImageGet)
            
        

        // idが一致するものの名前と商品イメージが欲しい。

        



        // 
        // const getCurryId = curry.find((curryid) => curryid.id === Number(id) )
        // console.log(getCurryId);


    //     {   cartItem: {
    //         orderDate: "",
    //         userName: "",
    //         mailAddress: "",
    //         addressNumber: "",
    //         address: "",
    //         phoneNumber: "",
    //         deliveryDate: "",
    //         deliveryTime: "",
    //         status: 0,
    //         //カートのカレー情報 仮置き
    //         cartItemList: [
    //             {name: 'カツカレー', pic:' /pic/1.jpg', size: 'M', topping: 'チーズ', number: 1, total:1490}
    //         ]
    //     }
    // }

        //undefinedCheck()

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
        carts.forEach(cart => {
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
        carts.forEach(cart => {
        taxInclude.push(cart.total * 1.1)
        })
        let totalTaxIncludes = taxInclude.reduce( (sum,currentVal) => {
            return sum + currentVal;
        },0)
        return Math.floor(totalTaxIncludes)
}

    // const [userState , setUser] = useState({})

    

    const remove = (removeIndex)=>{
        
        console.log('dispatch!removeTodo')
        console.log(removeIndex)

        // Storeの削除処理の準備
        // const rmIndex = carts.find((cart,index) => cart.index === removeIndex)
        // console.log(rmIndex)

        // const removeCart = carts2.forEach(cart2 =>{
        //     const idMatch = carts.find(cart => cart.id === cart2.id)
        //     console.log(idMatch)
        // })
        



        // 画面の削除処理
        const copyCart = carts2.concat()
        copyCart.splice(removeIndex,1)
        setCart2(copyCart)



        dispatch(removeCart(removeIndex))
    
    }

    const login=()=>{
        const google_auth_provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithRedirect(google_auth_provider)
        console.log('ログイン')
      }


    return(
        <React.Fragment>
            <h2>ショッピングカート</h2>

            { !Object.keys(carts).length ? 'カートに商品がありません！':
            <div>

                {/* <h3></h3>

                <div></div> */}

                <table border='1'>
                    <thead>
                        <tr>
                            <th>
                                <h2>商品名</h2>
                            </th>
                            <th>
                                <h2>商品イメージ</h2>
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
                        carts2.map( (ailias,index)=>{
                            return (
                            <tr key={ailias.id}>
                                <td>{ailias.name}</td>
                                <td><img src={ailias.pic}></img></td>
                                <td>{ailias.size}</td>
                                <td>{ailias.number}</td>
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
                        user === null ? 
                        <button onClick={ ()=>{login()} }>まずはログイン！</button>:
                        <button onClick={ ()=>{handleLink('/buyHistory')} }>注文に進む！</button>
                    }
                </div>
            
            </div>
            }
</React.Fragment>
    )
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


