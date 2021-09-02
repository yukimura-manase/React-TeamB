import React from 'react';
import { useDispatch,useSelector } from 'react-redux'; // 仮置きサンプル
import {useHistory} from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom' // Router設定仮置き
// import Product from './Product'

import  '../service/firebase'
import Header from './Header'
import {Detail} from './detail'
import {Product} from './Product'


const App = ()=> {
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
