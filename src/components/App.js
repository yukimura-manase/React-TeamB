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


// const useSelector=state=>state.StoreState.setLoginUser
// const currySelector=state=>state.StoreState.Curry
// const cartSelector=state=>state.StoreState.Cart

const App = ()=> {
  const dispatch = useDispatch()
// const useinfo=useSelector(useSelector)
// const curry=useSelector(currySelector)
// const cart=useSelector(cartSelector)

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
