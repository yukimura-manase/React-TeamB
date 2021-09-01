import logo from './logo.svg';
import './App.css';
import { useDispatch,useSelector } from 'react-redux';
import {Route, useHistory} from "react-router-dom"
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { OrderFinish } from "./orderFinish";
import { BuyHistory } from "./buyHistory";
import React from 'react';

function App() {
  return (
    <React.Fragment>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>

    <Router>
      <OrderFinish />

      <BuyHistory />

      <Switch>
            <Route path="/orderFinish" exact component={OrderFinish} />
            <Route path="/buyHistory" exact component={BuyHistory} />
      </Switch>

    </Router>

    </React.Fragment>
  );
}

export default App;
