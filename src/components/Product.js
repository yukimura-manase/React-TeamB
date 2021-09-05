import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import { fetchItem } from '../actions/ActionCreator';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
//materialUI
import { createStyles,makeStyles } from '@material-ui/styles';

const useStyle = makeStyles(() =>
    createStyles({
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
        "search":{
            textAlign:"center"
        },
        "card":{
            width: "350px",
            background: "#FFF",
            borderRadius: "5px",
            boxShadow: "0 2px 5px #ccc",
            marginBottom:"40px",
        },
        "card-list":{
            display:"flex",
            flexWrap:"wrap",
            justifyContent:"center",
            justifyContent:"space-evenly",
            height:"auto",
            width:"auto",
            padding: "5%",
        
        },
        "card-content":{
            padding: "20px",
            textAlign:"center",
            fontWeight:700,

        },
        "card-title":{
            fontSize:"20px",
            fontWeight:700,
            marginTop:"20px",
            marginBottom:"20px",
            textAlign:"center"
        },
        "card-picutre":{
            width: "350px",
            height: "200px"
              
        }
    }),
);

export const curryItem = state =>{
    return state.StoreState.Curry
}

export const Product =()=>{
    const curry =useSelector(curryItem)
    console.log(curry);
    // const dispatch=useDispatch()
    // useEffect(()=>{
    //     if(!curry){
    //         const CurryItem = []
    //   firebase
    //     .firestore()
    //     .collection(`product`)
    //     .get().then(snapshot => {
    //       snapshot.forEach(doc => {
    //         CurryItem.push(doc.data())
    //       })
    //     })
    //     }
    // },[])

    const classes = useStyle();

    const history=useHistory()

    const handleLink = path =>history.push(path)

    const [word,Setword]=useState('')
    const handleName=(event)=>{
        Setword(event.target.value)
    }
    return(
        <div>
            <div className={classes.search}>
                <h2>商品検索</h2>
                <input type='text' value={word} onChange={handleName} />
                    {/* 検索機能　絞り込み */}
                <button　className={classes.button} >検索</button>
            <h1>商品一覧</h1>
            </div>
            <div className={classes['card-list']}>
            {
                curry.map((curry)=>{
                    return<div key={curry.id} className={classes.card} >
                        <div className={classes['card-title']}>{curry.name}</div>
                        <div><img src={curry.pic} alt='' onClick={()=> handleLink(`currydetail/${curry.id}`)} className={classes['card-picutre']}/></div>
                        <div className={classes['card-content']}>
                            <div>Mサイズ:{curry.msizePrice}円</div>
                            <div>Lサイズ:{curry.lsizePrice}円</div>
                            <button onClick={()=> handleLink(`currydetail/${curry.id}`)} className={classes.button}>商品詳細へ</button>
                        </div>
                    </div>
                })
            }

            </div>
        </div>
    )
    }

    