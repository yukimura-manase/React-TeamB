import React from 'react';
//import { useDispatch,useSelector } from 'react-redux'; // 仮置きサンプル
//import {useHistory} from "react-router-dom"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom' // Router設定仮置き

import  '../service/firebase'
import Header from './Header'

import {Cart} from './Cart'



const App = ()=> {
  
  return (
    <Router>

      <div>

      <h1>TeamBの制作物</h1>

      <Header/>

      {/* Switchでルーティング(アクセス経路)設定の世界 */}

       <Switch>
         <Route path='/cart' component={Cart} />
         
       </Switch>
      

        </div>
    </Router>
  )

}

export default App;

