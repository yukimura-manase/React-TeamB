
import React,{useEffect} from 'react';

import {
  useHistory,
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom' // Router設定仮置き

import { useDispatch,useSelector } from 'react-redux'; // 仮置きサンプル

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth' // authentication code
import 'firebase/compat/firestore' // firestore access
import  '../service/firebase'
import Header from './Header'
import { setLoginUser,deleteLoginUser,fetchCartItem,fetchItem } from '../actions/ActionCreator';

import {Cart} from './Cart'

import Buyhistory from './Buyhistory'


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
    <Router>

      <div>

      <h1>TeamBの制作物</h1>

      <Header/>

      {/* Switchでルーティング(アクセス経路)設定の世界 */}

       <Switch>

         <Route path='/cart' component={Cart} />

         <Route path='/buyhistory' component={Buyhistory} />
         
       </Switch>
      

        </div>
    </Router>
  )

}

export default App;

