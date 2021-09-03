import React,{useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// import { useDispatch } from 'react-redux';
// import { setLoginUser,deleteLoginUser,fetchCartItem,fetchItem } from '../actions/ActionCreator';

// const cartSelector = state=> state.StoreState.Curry

const userSelector=state=>state.StoreState.loginUser
const currySelector=state=>state.StoreState.Curry
const cartSelector=state=>state.StoreState.Cart

const Header=()=>{

  // const dispatch = useDispatch()
  // const cart =useSelector(cartSelector)
  // console.log(cart)

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       dispatch(setLoginUser(user))
  //       dispatch(fetchCartItem())
  //     } else {
  //       dispatch(deleteLoginUser())
  //     }
  //     dispatch(fetchItem())
  //   })
  // },[]);


  const history=useHistory(); // useHistory => 画面の表示履歴のすべてのデータを持っているhistoryオブジェクトを呼び出し格納する。
  const handleLink = path =>history.push(path);
  const user=useSelector(userSelector)
  const curry=useSelector(currySelector)
  const cart=useSelector(cartSelector)
  // console.log(curry)
  // console.log(user)
  // console.log(cart)

  const login=()=>{
    const google_auth_provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(google_auth_provider)
    console.log('ログイン')
  }

  const logout=()=>{
    firebase.auth().signOut();
    console.log('ログアウト')
  }

  const Logbutton=()=>{
    if(user){
      return(
        <button onClick={logout}>ログアウト</button>
        )
      }else{
        return(
        <button onClick={login}>ログイン</button>
      )
    }
  }

  return(
    <nav>
      <button onClick={()=>handleLink('/')}>一覧</button>
      <button onClick={()=>handleLink('/cart')}>ショッピングカートへ</button>
      <button onClick={()=>handleLink('/buyHistory')}>確認画面</button>
      
      <Logbutton/>
    </nav>
  )

}

export default Header;