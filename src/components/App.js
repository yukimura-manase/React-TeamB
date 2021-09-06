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
// import Footer from './Footer';
import CurryDetail from './CurryDetail'
import {Cart} from './Cart'
import { setLoginUser,deleteLoginUser,fetchCartItem,fetchItem } from '../actions/ActionCreator';
import {Product} from './Product'
import { BuyHistory } from './buyHistory';
import { OrderFinish } from './orderFinish';

//const currySelector = state => state.StoreState.loginUser
// const currySelector=state=>state.StoreState.Curry
// const cartSelector=state=>state.StoreState.Cart

const App = () => {
  const dispatch = useDispatch()

  const setUser = (user) => {
    dispatch(setLoginUser(user))
  }

  const deleteUser = () => {
    dispatch(deleteLoginUser())
  }

  const fetchCart = (user) => {
    let cartItem = []
    firebase
      .firestore()
      .collection(`users/${user.uid}/carts`)
      .get().then(snapshot => {
        if (snapshot.empty) {
          firebase
            .firestore()
            .collection(`users/${user.uid}/carts`)
            .add({
              orderDate: "",
              userName: "",
              mailAddress: "",
              addressNumber: "",
              address: "",
              phoneNumber: "",
              deliveryDate: "",
              deliveryTime: "",
              status: 0,
              cartItemList: []
            }).then(doc => {
              cartItem.push({
                id: doc.id,
                orderDate: "",
                userName: "",
                mailAddress: "",
                addressNumber: "",
                address: "",
                phoneNumber: "",
                deliveryDate: "",
                deliveryTime: "",
                status: 0,
                cartItemList: []
              }
              )
            })
        }
        snapshot.forEach(doc => {
          if (doc.data().status === 0) {
            cartItem.push({ ...doc.data(), id: doc.id })
          }
        })
        dispatch(fetchCartItem(cartItem))
      })
  }

  const fetchCurry = () => {
    const CurryItem = []
    firebase
      .firestore()
      .collection(`product`)
      .get().then(snapshot => {
        snapshot.forEach(doc => {
          CurryItem.push(doc.data())
        })
        dispatch(fetchItem(CurryItem))
      })
  }

  const setCart=()=>{
    let cartItem = []
    cartItem.push({
      orderDate: "",
      userName: "",
      mailAddress: "",
      addressNumber: "",
      address: "",
      phoneNumber: "",
      deliveryDate: "",
      deliveryTime: "",
      status: 0,
      cartItemList: []
    })
    dispatch(fetchCartItem(cartItem))
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user)
        fetchCart(user)
      } else {
        deleteUser()
        setCart()
      }
    })
    fetchCurry()
  }, []);

  return (

    <React.Fragment>
      <Router>
      <Header/>

      {/* Switchでルーティング(アクセス経路)設定の世界 */}

      <Switch>
        <Route path='/currydetail/:id' component={CurryDetail}></Route>
        <Route path='/' exact component={Product}></Route>
        <Route path='/orderFinish' exact component={OrderFinish} />
        {/* <Route path='/buyHistory' exact component={BuyHistory} /> */}
        <Route path='/cart' exact component={Cart} />
      </Switch>
        {/* <Footer/> */}
      </Router>
    </React.Fragment>
  );
}

export default App;