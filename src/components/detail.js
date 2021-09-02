import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from 'react-router-dom'


export const Detail=()=>{
    const {id} =useParams();
    return(
        <div>
            <h1>商品詳細画面</h1>
            <p>{id}番目の商品</p>
        </div>

    )
}

