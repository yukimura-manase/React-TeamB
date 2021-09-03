import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // 仮置きサンプル
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import '../service/firebase'
import Header from './Header'
import { setLoginUser, deleteLoginUser, fetchCartItem, fetchItem } from '../actions/ActionCreator';

const userSelector = state => state.StoreState.loginUser
const currySelector = state => state.StoreState.Curry
const cartSelector = state => state.StoreState.Cart

const App = () => {
  const dispatch = useDispatch()

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
                id: doc.id, cartItem: {
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
              })
            })
        }
        snapshot.forEach(doc => {
          cartItem.push({ id: doc.id, cartItem: doc.data() })
        }
        )
      })
    dispatch(fetchCartItem(cartItem))
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
      })
    dispatch(fetchItem(CurryItem))
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(setLoginUser(user))
        fetchCart(user)
      } else {
        dispatch(deleteLoginUser())
      }
    })
    fetchCurry()
  }, []);

  return (
    <React.Fragment>
      <h1>TeamBの制作物</h1>
      <Header />
    </React.Fragment>
  );
}

export default App;
