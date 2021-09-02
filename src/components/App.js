import React from 'react';
import { useDispatch,useSelector } from 'react-redux'; // 仮置きサンプル
import {useHistory} from "react-router-dom"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom' // Router設定仮置き

import  '../service/firebase'
import Header from './Header'
import CurryDetail from './CurryDetail'

const App = ()=> {
  return (
    <React.Fragment>
      <h1>TeamBの制作物</h1>
      <Header/>
      <CurryDetail/>
    </React.Fragment>
  );
}

export default App;
