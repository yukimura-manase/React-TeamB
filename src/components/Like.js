import React, {useState,useEffect} from 'react'
import { removeLike } from '../actions/ActionCreator';
import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { createStyles, makeStyles } from '@material-ui/styles';

const useStyle = makeStyles(() =>
    createStyles({
        "u":{
            textDecoration:"none",
            borderBottom:"double 5px #faa61a",
        },
        "button":{
            borderColor:"#faa61a",
            color:"#faa61a",
            fontWeight:600,
            marginBottom:"8px",
            backgroundColor:"#fff",
            padding:"10px",
            "&:hover":{
                backgroundColor:"#faa61a",
                color:"#fff"
            }
        },
        "pic":{
            width: "350px",
            height: "200px"
        },
        "dis":{
            textAlign:"center"
            
        },
        "tableWidth":{
            width:"80%",
            margin:"3px auto",
            paddingTop:"30px",
            paddingBottom:"30px"
        },
        "cartTitle":{
            background:"#ffab4c",
            fontSize:"10px",
            color:"#fff"

        },
        "tableBody":{
            background:"#ffead6",
            textAlign:"center"
        },
    }),
    );
    

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

    const classes = useStyle()


    const user = useSelector(loginSelector)
    console.log(user);
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
        console.log(likes);
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
                <div className={classes.dis}>
                    <h2><u className={classes.u}>{user.displayName}さんのお気に入り商品！</u></h2>
                    <span><img src={user.photoURL}></img></span>
                </div>
                
            }
            
            { likes.length === 0 ? <h2>お気に入り登録がありません！</h2>:
                <div>
                    <div >
                        <table className={classes.tableWidth}>
                            <thead>
                                <tr className={classes.cartTitle}>
                                    <th>
                                        <h2>商品名</h2>
                                    </th>
                                    <th>
                                        <h2>商品イメージ</h2>
                                    </th>
                                    <th>
                                        <h2>説明</h2>
                                    </th>
                                    <th></th>
                                </tr>
                            </thead>
                    {
                        console.log(likes),
                        likes.map( (like,index)=>{
                            return (
                                    <tbody className={classes.tableBody}　key={like.id}>
                                        <tr>
                                        <td>
                                        <div>{like.name}</div>
                                        </td>
                                        <td>
                                        <div><img src={like.pic} className={classes.pic}></img></div>
                                        </td>
                                        <td>
                                            <div>{like.detail}</div>
                                        </td>
                                        <td>
                                            <button onClick={()=> handleLink(`currydetail/${like.id}`)} className={classes.button}>商品詳細へ</button>
                                            <button onClick={ ()=>{remove(index)} } className={classes.button}>お気に入りから削除</button>
                                        </td>
                                        </tr>
                                        </tbody>
                            )
                        })
                    }
                    
                                </table>
                            </div>

                </div>
            }

</React.Fragment>
    )




}
