import React, { useEffect, useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {useHistory,useParams} from 'react-router-dom';
import { fetchItem } from '../actions/ActionCreator';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'

export const curryItem = state =>{
    return state.StoreState.Curry
}

export const Detail=()=>{
    const curry =useSelector(curryItem)
    const {id} =useParams();
    const selectCurry=curry.find((curry)=>curry.id===Number(id))
    console.log(selectCurry)
    return(
        <div>
            <h1>商品詳細画面</h1>
            <p>{id}番目の商品</p>
            <div>{selectCurry.name}</div>
            <div><img src={selectCurry.pic} width="200px" height="200px"/></div>
        </div>

    )
}

