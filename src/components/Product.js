import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import { fetchItem } from '../actions/ActionCreator';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import { StoreState } from '../reducers/StoreState';

export const curryItem = state =>{
    return state.StoreState.Curry
}

export const Product =()=>{
    const curry =useSelector(curryItem)

    const history=useHistory()

    const handleLink = path =>history.push(path)

    const [word,Setword]=useState('')

    const handleName=(e)=>{
        Setword(e.target.value)
    }

    const [newCurry,setNewCurry]=useState([])
    console.log(newCurry);

    const serchCurry=()=>{
    let currys=(curry.filter(
        function(value){
            if(value.name.indexOf(word)>-1){
                return 1
            }
        },
    ))
    if(currys.length===0){
        alert('該当する商品はありません')
        Setword('')
    }
    setNewCurry(currys)
    }

    const ChangeCurry=()=>{
    if(newCurry.length===0){
        return(
            curry.map((curry)=>{
            return<div key={curry.id}>
            <div>商品名:{curry.name}</div>
            <div><img src={curry.pic} alt='' width="100px"/></div>
            <div>Mサイズ:{curry.msizePrice}円</div>
            <div>Lサイズ:{curry.lsizePrice}円</div>
            <button onClick={()=> handleLink(`currydetail/${curry.id}`)}>商品詳細へ</button>
            </div>
            })
        )
    } else {
        return(
            newCurry.map((curry)=>{
            return <div key={curry.id}>
            <div>商品名:{curry.name}</div>
            <div><img src={curry.pic} alt='' width="100px"/></div>
            <div>Mサイズ:{curry.msizePrice}円</div>
            <div>Lサイズ:{curry.lsizePrice}円</div>
            <button onClick={()=> handleLink(`currydetail/${curry.id}`)}>商品詳細へ</button>
            </div>
            })
        )
    }
    }
    return(
        <div>
            <h1>商品検索</h1>
            <input type='text'value={word} onChange={handleName} placeholder='商品名を入力'/>
            <button onClick={serchCurry}>検索</button>
            <h2>商品一覧</h2>
            <div>{ChangeCurry()}</div>
            </div>
    )
}
