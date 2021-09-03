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

import { BuyHistory } from "./BuyHistory";
import { OrderFinish } from './OrderFinish';

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
    <Router>
      <React.Fragment>

        <h1>TeamBの制作物</h1>
        <Header/>

        <BuyHistory />


        <Switch>
          <Route path='/orderFinish' exact component={OrderFinish} />

        </Switch>

      </React.Fragment>
    </Router>
  );
}

export default App;
