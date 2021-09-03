import React from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const userSelector = state => state.StoreState.loginUser

const Header=()=>{
  const history=useHistory();
  const handleLink = path =>history.push(path);
  const user = useSelector(userSelector)

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
      <Logbutton/>
    </nav>
  )
}

export default Header;