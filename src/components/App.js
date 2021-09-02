import React,{useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux'; // 仮置きサンプル
import {
  useHistory,
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom' // Router設定仮置き
// import Product from './Product'

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import  '../service/firebase'
import Header from './Header'
import { setLoginUser,deleteLoginUser,fetchCartItem,fetchItem } from '../actions/ActionCreator';
import {Detail} from './detail'
import {Product} from './Product'


const App = ()=> {
  const dispatch = useDispatch()

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
      <Router>
      <h1>TeamBの制作物</h1>
      <Header/>
      <Switch>
        <Route path='/detail/:id' component={Detail}></Route>
        <Route path='/' component={Product}></Route>
      </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
