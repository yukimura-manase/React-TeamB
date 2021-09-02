import React,{useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux'; // 仮置きサンプル
import {
  useHistory,
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom' // Router設定仮置き

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import  '../service/firebase'
import Header from './Header'
import { setLoginUser,deleteLoginUser,fetchCartItem,fetchItem } from '../actions/ActionCreator';

const currySelector = state => state.StoreState.loginUser

const App = ()=> {
  const dispatch = useDispatch()
  const curry = useSelector(currySelector)
  console.log(curry)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(setLoginUser(user))
        dispatch(fetchCartItem())
      } else {
        dispatch(deleteLoginUser())
      }
      dispatch(fetchItem())
    })
  }, []);

  return (
    <React.Fragment>
      <h1>TeamBの制作物</h1>
      <Header/>
    </React.Fragment>
  );
}

export default App;
