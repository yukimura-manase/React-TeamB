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
import Footer from './Footer';
import CurryDetail from './CurryDetail'
import {Cart} from './Cart'
import { setLoginUser,deleteLoginUser,fetchCartItem,fetchItem } from '../actions/ActionCreator';
import {Product} from './Product'
import { BuyHistory } from './buyHistory';
import { OrderFinish } from './orderFinish';

//materialUI
import { createStyles,makeStyles } from '@material-ui/styles';


const useStyle = makeStyles(() =>
    createStyles({
      "header":{
        width:"35%",
      },
      "pic":{
        textAlign:"center",
        backgroundColor:"#faa61a"
      }
    }),
  );
    
//const currySelector = state => state.StoreState.loginUser

  
const userSelector = state => state.StoreState

// const currySelector=state=>state.StoreState.Curry
// const cartSelector=state=>state.StoreState.Cart

const App = () => {
  const classes = useStyle();


  const dispatch = useDispatch()
  const state = useSelector(userSelector)

  const setUser = (user) => {
    console.log(user)
    dispatch(setLoginUser(user))
  }

  const deleteUser = () => {
    dispatch(deleteLoginUser())
  }

  // if(user)
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
        console.log(cartItem)
        dispatch(fetchCartItem(cartItem))
      })
  }

  // const noLoginCart = ()=>{ // 追加
  //   console.log('noLoginCart')
  //   dispatch(fetchCartItem({
  //     orderDate: "",
  //     userName: "",
  //     mailAddress: "",
  //     addressNumber: "",
  //     address: "",
  //     phoneNumber: "",
  //     deliveryDate: "",
  //     deliveryTime: "",
  //     status: 0,
  //     cartItemList: []
  //   })
  //   )
  // }

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
    //noLoginCart() // 追加

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
        <div className={classes.pic}>
          <img src={`${process.env.PUBLIC_URL}/pic/header_logo.png`} alt="Logo" className={classes.header}/>
        </div>
      <Header/>

      {/* Switchでルーティング(アクセス経路)設定の世界 */}

      <Switch>
        <Route path='/currydetail/:id' component={CurryDetail}></Route>
        <Route path='/' exact component={Product}></Route>
        <Route path='/orderFinish' exact component={OrderFinish} />
        <Route path='/buyHistory' exact component={BuyHistory} />
        <Route path='/cart' exact component={Cart} />
      </Switch>
        <Footer/>
      </Router>
    </React.Fragment>
  );
}

export default App;