import React, { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';

export const curryItem = state =>{
    return state.StoreState.Curry
}

export const Product =()=>{
    const history=useHistory();
    const handleLink = path =>history.push(path);

    const [word,Setword]=useState('')
    const handleName=(event)=>{
        Setword(event.target.value)
        console.log(word)
    }
    console.log(word)

    //store stateから商品情報を取得　配列処理
    const curry =useSelector(curryItem)
    const Products=curry.map((val,index)=>{
        return(
                <tr>
                    <td>{val.img}</td>
                    <td><p>{val.name}</p></td>
                    <td><p>{val.lsizePrice}円</p></td>
                    <td><p>{val.msizePrice}円</p></td>
                    <td><button onClick={()=> handleLink(`detail/${index}`)}>商品詳細へ</button></td>
                </tr>
        )
    })
    return(
        <React.Fragment>
            <div>
                <h1>一覧画面</h1>
                <input type='text' value={word} onChange={handleName} />
                {/* 検索機能　絞り込み */}
                <button>検索</button>

                <table>
                    <tr>
                        商品一覧
                    </tr>
                    <tr>
                        <td>{Products}</td>
                    </tr>
                </table>
            </div>
        </React.Fragment>
    )
}

// export default Product