import React,{Component,useState} from 'react'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import { useSelector,useDispatch } from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import { Link } from 'react-router-dom';
import {curryCartItem} from '../actions/ActionCreator'


//store/stateのなかのCurryの値を取ってきてcurrydetailに代入
export const curryItem = state =>{
    return state.StoreState.Curry
}

 
const CurryDetail = () => {

    const dispatch = useDispatch()

    //useSelectorを使い参照したいデータを取得
    //値をcurryListに代入
    const curry =useSelector(curryItem)
    console.log(curry);

    //params
    const {id} = useParams()
    const getCurryId = curry.find((curryid) => curryid.id === Number(id) )
    console.log(getCurryId);
    let setNumber = (e) => setQuantity(e.target.value)

    //サイズ
    const [size,setSize] = useState('')
    console.log(size);

    //数量
    const [quantity,setQuantity] = useState(1)
    console.log(quantity);
    
    //トッピングを入れる配列
    const [toppingItem,setToppingItem] = useState([]) 
    console.log(toppingItem);
    const setTopping = (e) => {
        if(toppingItem.includes(e.target.value)){
            setToppingItem(toppingItem.filter(item => item !== e.target.value ))
        } else {
            setToppingItem([...toppingItem, e.target.value])
        }        
    }

    //金額の計算 params入れる
    let totalPrice = () => {
        if(size === "M"){
            return curry[0].msizePrice * quantity + toppingItem.length * 200 * quantity 
        }else if(size === "L"){
            return curry[0].lsizePrice * quantity + toppingItem.length * 300 * quantity 
        }
        }

    //イベント発火時処理
    //ユーザーが選択商品情報をcurryListに追加
    const [sizeDecision,setsizeDecision] = useState('')
    //handleLink
    const history = useHistory()
    const handleLink = path => history.push(path)

    
    let setErrors = ""
    const cartButton = () => {
        //エラー文表示
        setsizeDecision("")
        if(size === ""){
            setErrors ="サイズを選択してください"
            setsizeDecision(setErrors)
        }else{
            let curryList = ({id : Number(id),size : size,topping : toppingItem,number : quantity,total : totalPrice()})
            console.log(curryList);
            dispatch(curryCartItem(curryList))    
            handleLink('/cart')
        }    
    }


    return(
        <div>
            <h1>商品詳細</h1>

            <div>
                <div>{getCurryId.name}</div>
                <div>
                    <img src={getCurryId.pic}></img>
                </div>
                <div>{getCurryId.detail}</div>
                <div>
                    <div>サイズ</div>
                    <label htmlFor="button"><input type="radio"  value="M"　name="button" onClick={()=> setSize('M')}/>M {getCurryId.msizePrice}  (税抜)</label>
                    <label htmlFor="button"><input type="radio"   value="L" name="button" onClick={()=> setSize('L')}/>L  {getCurryId.lsizePrice}  (税抜)</label>
                    <div>{sizeDecision}</div>
                </div>

            </div>

            <div>
                <div>トッピング：１つにつき M 200円(税抜) L 300円(税抜)</div>
                <div name="topping">
                    <label htmlFor='オニオン'><input type="checkbox" id='オニオン' value="オニオン" onChange={setTopping}/>オニオン</label>&nbsp;&nbsp;
                    <label htmlFor='ツナマヨ'><input type="checkbox" id='ツナマヨ' value="ツナマヨ" onChange={setTopping}/>ツナマヨ</label>&nbsp;&nbsp;
                    <label htmlFor='イタリアントマト'><input type="checkbox" id='イタリアントマト' value="イタリアントマト"　onChange={setTopping}/>イタリアントマト</label>&nbsp;&nbsp;
                    <label htmlFor='イカ'><input type="checkbox" id='イカ' value="イカ" onChange={setTopping}/>イカ</label>&nbsp;&nbsp;
                    <label htmlFor='プルコギ'><input type="checkbox" id='プルコギ' value="プルコギ" onChange={setTopping}/>プルコギ</label>&nbsp;&nbsp;
                    <label htmlFor='アンチョビ'><input type="checkbox" id='アンチョビ' value="アンチョビ"　onChange={setTopping}/>アンチョビ</label>&nbsp;&nbsp;
                    <label htmlFor='エビ'><input type="checkbox" id='エビ' value="エビ" onChange={setTopping}/>エビ</label>&nbsp;&nbsp;
                    <label htmlFor='コーン'><input type="checkbox" id='コーン' value="コーン"　onChange={setTopping}/>コーン</label>&nbsp;&nbsp;
                    <label htmlFor='ピーマン'><input type="checkbox" id='ピーマン' value="ピーマン" onChange={setTopping}/>ピーマン</label>&nbsp;&nbsp;
                    <label htmlFor='フレッシュスライストマト'><input type="checkbox" id='フレッシュスライストマト' value="フレッシュスライストマト"　onChange={setTopping}/>フレッシュスライストマト</label>&nbsp;&nbsp;
                    <label htmlFor='ベーコン'><input type="checkbox" id='ベーコン' value="ベーコン" onChange={setTopping}/>ベーコン</label>&nbsp;&nbsp;
                    <label htmlFor='ペパロニ･サラミ'><input type="checkbox" id='ペパロニ･サラミ' value="ペパロニ･サラミ" onChange={setTopping}/>ペパロニ･サラミ</label>&nbsp;&nbsp;
                    <label htmlFor='熟成ベーコン'><input type="checkbox" id='熟成ベーコン' value="熟成ベーコン" onChange={setTopping}/>熟成ベーコン</label>&nbsp;&nbsp;
                    <label htmlFor='特製マヨソース'><input type="checkbox" id='特製マヨソース' value="特製マヨソース" onChange={setTopping}/>特製マヨソース</label>&nbsp;&nbsp;
                    <label htmlFor='カマンベールチーズ'><input type="checkbox" id='カマンベールチーズ' value="カマンベールチーズ" onChange={setTopping}/>カマンベールチーズ</label>&nbsp;&nbsp;
                    <label htmlFor='フレッシュモッツァレラチーズ'><input type="checkbox" id='フレッシュモッツァレラチーズ' value="フレッシュモッツァレラチーズ" onChange={setTopping}/>フレッシュモッツァレラチーズ</label>
                    <label htmlFor='イタリアンソーセージ'><input type="checkbox" id='イタリアンソーセージ' value="イタリアンソーセージ" onChange={setTopping}/>イタリアンソーセージ</label>
                    <label htmlFor='ガーリックスライス'><input type="checkbox" id='ガーリックスライス' value="ガーリックスライス" onChange={setTopping}/>ガーリックスライス</label>
                    <label htmlFor='あらびきスライスソｰセｰジ'><input type="checkbox" id='あらびきスライスソｰセｰジ' value="あらびきスライスソｰセｰジ" onChange={setTopping}/>あらびきスライスソｰセｰジ</label>
                    <label htmlFor='ブロッコリー'><input type="checkbox" id='ブロッコリー' value="ブロッコリー" onChange={setTopping}/>ブロッコリー</label>
                    <label htmlFor='グリーンアスパラ'><input type="checkbox" id='グリーンアスパラ' value="グリーンアスパラ" onChange={setTopping}/>グリーンアスパラ</label>
                    <label htmlFor='パルメザンチーズ'><input type="checkbox" id='パルメザンチーズ' value="パルメザンチーズ" onChange={setTopping}/>パルメザンチーズ</label>
                    <label htmlFor='パイナップル'><input type="checkbox" id='パイナップル' value="パイナップル" onChange={setTopping}/>パイナップル</label>
                    <label htmlFor='ハラペーニョ'><input type="checkbox" id='ハラペーニョ' value="ハラペーニョ"　onChange={setTopping}/>ハラペーニョ</label>
                    <label htmlFor='もち'><input type="checkbox" id='もち' value="もち" onChange={setTopping}/>もち</label>
                    <label htmlFor='ポテト'><input type="checkbox" id='ポテト' value="ポテト" onChange={setTopping}/>ポテト</label>
                    <label htmlFor='ブラックオリーブ'><input type="checkbox" id='ブラックオリーブ' value="ブラックオリーブ" onChange={setTopping}/>ブラックオリーブ</label>
                    <label htmlFor='チーズ増量'><input type="checkbox" id='チーズ増量' value="チーズ増量" onChange={setTopping}/>チーズ増量 </label>
                </div>
            </div>
            <div>
                <div>数量:</div>
                <div><select name="number"　onChange={setNumber}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                </select></div>
            </div>
            <div>この商品の合計金額：{totalPrice()}円(税抜)</div>
            <div>
                {/* <button onClick={cartButton}>カートに入れる</button> */}
                <button onClick={cartButton}>カートに入れる</button>
            </div>
        </div>


)
} 

export default CurryDetail