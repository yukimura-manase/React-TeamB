import React from 'react';
import {useHistory} from "react-router-dom";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';

const Header=()=>{

  const history = useHistory(); // useHistory => 画面の表示履歴のすべてのデータを持っているhistoryオブジェクトを呼び出し格納する。
  const handleLink = path =>history.push(path);

  const login=()=>{
    const google_auth_provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(google_auth_provider)
  }

  const logout=()=>{
    firebase.auth().signOut();
  }

  return(
    <nav>
      <button onClick={ ()=>handleLink('/') }>一覧</button>
      <button onClick={ ()=>handleLink('/cart') }>ショッピングカートへ</button>
      <button onClick={login}>ログイン</button>
      <button onClick={logout}>ログアウト</button>
    </nav>
  )

}

export default Header;