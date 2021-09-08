import React, {useState,useEffect} from 'react'
import { removeLike } from '../actions/ActionCreator';
import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const loginSelector = state=>{
    return state.StoreState.loginUser
}

const CartSelector = state => {
    return state.StoreState.Cart
}

const currySelector = state => {
    return state.StoreState.Curry
}

export const Like = ()=>{

    const user = useSelector(loginSelector)

    const cartLikelist = useSelector(CartSelector)

    const currylist = useSelector(currySelector)

    const history = useHistory();
    const handleLink = path =>history.push(path);

    const dispatch = useDispatch();

    const 
    [ currys, setCurry ] = useState([]),
    [ likes, setLike ] = useState([])

    useEffect( ()=>{

        currylist.length !== 0 && setCurry(currylist)

        //console.log(likelist)
        cartLikelist.length !== 0 &&  setLike(cartLikelist[0].likeItemList)

    },[currylist,currys,cartLikelist,likes])


    const remove = (index)=>{
        //console.log(index);
        dispatch(removeLike(index))
    
    }

    return(
        <React.Fragment>

            {
                user === null ? 
                <h2>お気に入り画面(ログインユーザーのみが使えます！)</h2>:
                <div>
                    <h2>{user.displayName}さんのお気に入り商品！</h2>
                    <span><img src={user.photoURL}></img></span>
                </div>
                
            }
            
            { likes.length === 0 ? <h2>お気に入り登録がありません！</h2>:
                <div>
                    {
                        console.log(likes),
                        likes.map( (like,index)=>{
                            return (
                            <div key={like.id}>
                                <div>商品名：{like.name}</div>
                                <div><img src={like.pic}></img></div>
                                <div>商品説明：{like.detail}</div>
                                <button onClick={()=> handleLink(`currydetail/${like.id}`)} >商品詳細へ</button>
                                <button onClick={ ()=>{remove(index)} }>お気に入りから削除</button>
                            </div>
                            )
                        })
                    }
                </div>
            }

</React.Fragment>
    )




}
