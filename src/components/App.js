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

const userSelector=state=>state.StoreState.loginUser
const currySelector=state=>state.StoreState.Curry
const cartSelector=state=>state.StoreState.Cart

const App = ()=> {
  const dispatch = useDispatch()
  const userinfo=useSelector(userSelector)
  const curry=useSelector(currySelector)
  const cart=useSelector(cartSelector)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(setLoginUser(user))
        dispatch(fetchCartItem(user))
      } else {
        dispatch(deleteLoginUser())
      }
    })
    dispatch(fetchItem())
  }, []);
    console.log(curry)
    console.log(userinfo)
    console.log(cart)
  return (
    <React.Fragment>
      <h1>TeamBの制作物</h1>
      <Header/>
    </React.Fragment>
  );
}

export default App;
