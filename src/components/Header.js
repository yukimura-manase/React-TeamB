import React,{useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// import { useDispatch } from 'react-redux';
// import { setLoginUser,deleteLoginUser,fetchCartItem,fetchItem } from '../actions/ActionCreator';
import { createStyles,makeStyles } from '@material-ui/styles';

// const cartSelector = state=> state.StoreState.Curry

const userSelector=state=>state.StoreState.loginUser
const currySelector=state=>state.StoreState.Curry
const cartSelector=state=>state.StoreState.Cart

const useStyle = makeStyles(() =>
  createStyles({
    "right":{
      textAlign:"right",
    },
    "buttonStyle":{
      fontWeight:700,
      fontSize:"17px",
      border:"none",  /* 枠線を消す */
      outline: "none", /* クリックしたときに表示される枠線を消す */
      background:"transparent", /* 背景の灰色を消す */
      "&:hover":{
        backgroundColor:"#faa61a",
        color:"#fff"
    }

    }
  }),
);

const Header=()=>{
  
  const classes = useStyle();

  const history=useHistory(); // useHistory => 画面の表示履歴のすべてのデータを持っているhistoryオブジェクトを呼び出し格納する。
  const handleLink = path =>history.push(path);
  const user=useSelector(userSelector)
  const curry=useSelector(currySelector)
  const cart=useSelector(cartSelector)
  // console.log(curry)
  console.log(user)
  console.log(cart)

  const login=()=>{
    const google_auth_provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(google_auth_provider)
  }

  const logout=()=>{
    firebase.auth().signOut();
  }

  const Logbutton=()=>{
    if(user){
      return(
        <button onClick={logout} className={classes.buttonStyle}>ログアウト</button>
        )
      }else{
        return(
        <button onClick={login} className={classes.buttonStyle}>ログイン</button>
      )
    }
  }

  return(
    <React.Fragment>
    <header>
      <div className={classes.right}>
        <button onClick={()=>handleLink('/')} className={classes.buttonStyle}>一覧</button>|
        <button onClick={()=>handleLink('/cart')} className={classes.buttonStyle}>ショッピングカートへ</button>|
        <Logbutton />
      </div>
    </header>
    </React.Fragment>
  )

}

export default Header;