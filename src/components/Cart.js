import React, {useState,useEffect} from 'react'
import { removeCart , addOrder} from '../actions/ActionCreator';
import { useDispatch,useSelector } from 'react-redux';
import {useHistory} from "react-router-dom";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { createStyles,makeStyles } from '@material-ui/styles';

const useStyle = makeStyles(() =>
    createStyles({
        "text":{
            textAlign:"center",
            fontWeight:600
        },
        "button":{
            borderColor:"#faa61a",
            color:"#faa61a",
            fontWeight:600,
            marginBottom:"8px",
            backgroundColor:"#fff",
            padding:"10px",
            "&:hover":{
                backgroundColor:"#faa61a",
                color:"#fff"
            }
        },
        "pic":{
            width: "350px",
            height: "200px"
        },
        "tableWidth":{
            width:"80%",
            margin:"3px auto",
            paddingTop:"30px",
            paddingBottom:"30px"
        },
        "cartTitle":{
            background:"#ffab4c",
            fontSize:"10px",
            color:"#fff"

        },
        "tableBody":{
            background:"#ffead6"
        },
        "u":{
            textDecoration:"none",
            borderBottom:"double 5px #faa61a",
        },
        "price":{
            fontSize:"18px",
            paddingBottom:"15px"
        }



    }),
);
    


const loginSelector = state=>{ // Storeのログインユーザー情報
    return state.StoreState.loginUser
}


const cartSelector = state => { // Storeのカート情報
    return state.StoreState.Cart
}

const currySelector = state => {
    return state.StoreState.Curry
}

export const Cart = ()=>{

    const classes = useStyle();


    const user = useSelector(loginSelector)
    console.log(user);

    const cartlist = useSelector(cartSelector) // useSelectorの引数にcartSelector関数を渡す。 => Storeのstate情報の一部が引数に入る。

    const currylist = useSelector(currySelector)

    const history = useHistory(); // useHistory => 画面の表示履歴のすべてのデータを持っているhistoryオブジェクトを呼び出し格納する。
    const handleLink = path =>history.push(path);
    const dispatch = useDispatch() // useDispatchを呼び出して変数dispatchに格納する。

   const 
   [ currys, setCurry] = useState([]),
   [ carts, setCart ] = useState([]),
   [ carts2 , setCart2 ] = useState([])
   //[ userData, setUser ] = useState(null)

    useEffect(
        ()=>{
            currylist.length !==0 && setCurry(currylist)
            cartlist.length !== 0 &&  setCart(cartlist[0].cartItemList)

            if( cartlist.length !== 0 && currylist.length !==0 ){

                const cartIdList =  carts.map( cart => cart.id) //カート内の商品のIDの配列を生成

                let macthCurryData = cartIdList.map( cartid => {
                    return currys.find(curry => cartid === curry.id) // idリストの中身と一つ一つ
                })

                const mergeArray = [] // 入れ物用意

                carts.forEach(cart => {
                    let idMatchCurry = macthCurryData.find( currydata => currydata.id === cart.id) // idが一致するものを一つ格納！
                    const merged = {...cart,...idMatchCurry}                    
                    mergeArray.push(merged)
                })
                cartlist.length !== 0 && setCart2(mergeArray)
            }
        },[cartlist,currylist,carts,currys])
    
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

    const remove = (removeIndex)=>{
        
        console.log('dispatch!removeTodo')
        console.log(removeIndex)
        
        // 画面の削除処理
        const copyCart2 = carts2.concat()
        copyCart2.splice(removeIndex,1)
        setCart2(copyCart2)

        dispatch(removeCart(removeIndex))
    
    }

    const login=()=>{
        const google_auth_provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithRedirect(google_auth_provider)
      }

    return(
        <React.Fragment>
            {
                user === null ? 
                <div>ショッピングカート</div>:
                <div className={classes.text}>
                    <h2><u className={classes.u}>{user.displayName}さんのショッピングカート</u></h2>
                    <span><img src={user.photoURL}></img></span>
                </div>
                
            }
           
            {carts.length === 0 ? 'カートに商品がありません！':
            <div className={classes.text}>
               

                <table className={classes.tableWidth}>
                    <thead>
                        <tr className={classes.cartTitle}>
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
                            <tr key={ailias.id} className={classes.tableBody}>
                                <td>{ailias.name}</td>
                                <td><img src={ailias.pic} className={classes.pic}></img></td>
                                <td>{ailias.size}</td>
                                <td>{ailias.number}</td>
                                <td>{ailias.topping}</td>
                                <td>{ailias.total}</td>
                                <td><button onClick={ ()=>{remove(index)} } className={classes.button}>削除</button></td>
                            </tr>
                            )
                        })
                    }
                    </tbody>
                </table>


                <div>消費税：{ totalTax() }円</div>
                <div className={classes.price}><u className={classes.u}>ご注文金額合計：{ sumTotalPlice() }円(税込)</u></div>
                <div>
                    {/* {checkLogin()} */}
                    {
                        user === null ? 
                        <button onClick={ ()=>{login()} } className={classes.button}>まずはログイン！</button>:
                        <button onClick={ ()=>{ handleLink('/buyHistory')} } className={classes.button}>注文に進む！</button>
                    }
                </div>
            
            </div>
            }
</React.Fragment>
    )
}
