import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';

export const curryItem = state =>{
    return state.StoreState.Curry
}

export const Product =()=>{
    const curry =useSelector(curryItem)

    // useEffect(()=>{
    //     console.log(1)
    // },[curry])


    const history=useHistory()

    const handleLink = path =>history.push(path)

    const [word,Setword]=useState('')
    const handleName=(event)=>{
        Setword(event.target.value)
        console.log(word)

    }
    console.log(word)
    console.log(curry)
    return(
        <div>
            <h1>商品検索</h1>
            <input type='text' value={word} onChange={handleName} />
                {/* 検索機能　絞り込み */}
            <button>検索</button>
            <h2>商品一覧</h2>
            {curry.map((curry,index)=>{
                return<div key={curry.index}>
                    <div>商品名:{curry.name}</div>
                    <div><img src={curry.pic} alt='' width="100px"/></div>
                    <div>Lサイズ:{curry.lseziPrice}円</div>
                    <div>Mサイズ:{curry.mseziPrice}円</div>
                    <button onClick={()=> handleLink(`detail/${curry.id}`)}>商品詳細へ</button>
                </div>
        })}
        </div>
    )
    }
 // async function Newcurry(){
    //    const curry =useSelector(curryItem)
    //    console.log(curry)
    //    return curry
    // }
    // Newcurry().then((value)=>{
    //     console.log(value)
    //     return(
    //         <div>
    //             <h1>商品検索</h1>
    //             <input type='text' value={word} onChange={handleName} />
    //                 {/* 検索機能　絞り込み */}
    //             <button>検索</button>
    //             <h2>商品一覧</h2>
    //             {value.map((curry,index)=>{
    //                 return<div key={curry.index}>
    //                     <div>商品名:{curry.name}</div>
    //                     <div><img src={curry.pic} alt='' width="100px"/></div>
    //                     <div>Lサイズ:{curry.lseziPrice}円</div>
    //                     <div>Mサイズ:{curry.mseziPrice}円</div>
    //                     <button onClick={()=> handleLink(`detail/${curry.id}`)}>商品詳細へ</button>
    //                 </div>
    //         })}
    //         </div>
    //     )
    // })




    //store stateから商品情報を取得　配列処理

    // const curry =useSelector(curryItem)
//     console.log(curry)

//     useEffect(()=>{
//         console.log('a')
//     },[curry])

//     const Products = curry.map((val,index)=>{
//         return(
//             <tbody>
//                 <tr key={val.id}>
//                     <td><img src={val.pic} width='200px' height='200px'/></td>
//                     <td>{val.name}</td>
//                     <td>{val.lsizePrice}円</td>
//                     <td>{val.msizePrice}円</td>
//                     <td><button onClick={()=> handleLink(`detail/${index}`)}>商品詳細へ</button></td>
//                 </tr>
//                 </tbody>
//         )
//     })

//     return(
//         <React.Fragment>
//             <div>
//                 <h1>一覧画面</h1>
//                 <input type='text' value={word} onChange={handleName} />
//                 {/* 検索機能　絞り込み */}
//                 <button>検索</button>

//                 <table border="1">
//                     <thead>
//                     <tr>
//                         商品一覧
//                     </tr>
//                     </thead>

//                     <tbody>
//                     <tr>
//                         <td>
//                             {Products}
//                         </td>
//                     </tr>
//                     </tbody>
//                 </table>
//             </div>
//         </React.Fragment>
//     )
// }