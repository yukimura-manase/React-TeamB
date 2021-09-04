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
import '../service/firebase'
import Header from './Header'
import Footer from './Footer';
import CurryDetail from './CurryDetail'
import {Cart} from './Cart'
import { setLoginUser,deleteLoginUser,fetchCartItem,fetchItem } from '../actions/ActionCreator';
import {Product} from './Product'


const userSelector=state=>state.StoreState
// const currySelector=state=>state.StoreState.Curry
// const cartSelector=state=>state.StoreState.Cart

const App = () => {
  const dispatch = useDispatch()
  const state=useSelector(userSelector)

  const setUser=(user)=>{
    console.log(user)
    dispatch(setLoginUser(user))
  }

  const deleteUser=()=>{
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

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user)
        fetchCart(user)
      } else {
        deleteUser()
      }
    })
    fetchCurry()
  }, []);

  return (
    <React.Fragment>
      <Router>
      <Header/>
      <Switch>
        {/* <Route path='/currydetail' component={CurryDetail}></Route> */}
        <Route path='/currydetail/:id' component={CurryDetail}></Route>
        <Route path='/' exact component={Product}></Route>
        <Route path='/cart' exact component={Cart}></Route>
      </Switch>
        <Footer/>
      </Router>
    </React.Fragment>
  );
}

export default App;
