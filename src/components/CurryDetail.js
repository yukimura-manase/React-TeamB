import React,{Component,useState} from 'react'
import firebase from 'firebase/compat'
import 'firebase/compat/auth';
import { useSelector,useDispatch } from 'react-redux';

export const currydetail = state => {
    //store/stateのなかのcurryListの値を取ってくる
    return state.StoreState.curryList
}

const CurryDetail = () => {
    //store/stateに値を渡すための準備
    //オブジェクトの形で値を渡す
    // const [cItemLists,setcItemLists] = useState({})
    
    //useSelectorを使い参照したいデータを取得
    //値をcurryListに代入
    const curryList = useSelector(currydetail)
    console.log(curryList);
    //イベント発火時処理
    //クリックボタンが押されたら
    //ユーザーが選択商品情報をcurryListに追加
    const cartButton = () => {

        alert('クリックしました')
    }

    // const totalPrice = () => {
    //     if()
    // }

    // const 


    return(
        <div>
            <h1>商品詳細</h1>


            {
            curryList.map(curry => {
                return(

            <div>
                <div>{curry.name}</div>
                <div>
                    <img src={curry.pic}></img>
                </div>
                <div>{curry.detail}</div>
                <div>
                    <div>サイズ</div>
                    <label htmlFor="M"><input type="radio" id="M" value="M"　name="button" />M {curry.msizePrice} (税抜)</label>
                    <label htmlFor="l"><input type="radio" id="L"  value="L" name="button"/>L　{curry.lsizePrice} (税抜)</label>
                </div>

            </div>
                            )
                        })
                        }
            

            <div>
                <div>トッピング：１つにつき M 200円(税抜) L 300円(税抜)</div>
                <div name="topping">
                    <label htmlFor='オニオン'><input type="checkbox" id='オニオン' value=""/>オニオン</label>&nbsp;&nbsp;
                    <label htmlFor='ツナマヨ'><input type="checkbox" id='ツナマヨ' value="" />ツナマヨ</label>&nbsp;&nbsp;
                    <label htmlFor='イタリアントマト'><input type="checkbox" id='イタリアントマト' value=""/>イタリアントマト</label>&nbsp;&nbsp;
                    <label htmlFor='イカ'><input type="checkbox" id='イカ' value="イカ" />イカ</label>&nbsp;&nbsp;
                    <label htmlFor='プルコギ'><input type="checkbox" id='プルコギ' value="" />プルコギ</label>&nbsp;&nbsp;
                    <label htmlFor='アンチョビ'><input type="checkbox" id='アンチョビ' value=""/>アンチョビ</label>&nbsp;&nbsp;
                    <label htmlFor='エビ'><input type="checkbox" id='エビ' value="エビ" />エビ</label>&nbsp;&nbsp;
                    <label htmlFor='コーン'><input type="checkbox" id='コーン' value=""/>コーン</label>&nbsp;&nbsp;
                    <label htmlFor='ピーマン'><input type="checkbox" id='ピーマン' value="" />ピーマン</label>&nbsp;&nbsp;
                    <label htmlFor='フレッシュスライストマト'><input type="checkbox" id='フレッシュスライストマト' value=""/>フレッシュスライストマト</label>&nbsp;&nbsp;
                    <label htmlFor='ベーコン'><input type="checkbox" id='ベーコン' value="ベーコン" />ベーコン</label>&nbsp;&nbsp;
                    <label htmlFor='ペパロニ･サラミ'><input type="checkbox" id='ペパロニ･サラミ' value="" />ペパロニ･サラミ</label>&nbsp;&nbsp;
                    <label htmlFor='熟成ベーコン'><input type="checkbox" id='熟成ベーコン' value="" />熟成ベーコン</label>&nbsp;&nbsp;
                    <label htmlFor='特製マヨソース'><input type="checkbox" id='特製マヨソース' value="" />特製マヨソース</label>&nbsp;&nbsp;
                    <label htmlFor='カマンベールチーズ'><input type="checkbox" id='カマンベールチーズ' value="" />カマンベールチーズ</label>&nbsp;&nbsp;
                    <label htmlFor='フレッシュモッツァレラチーズ'><input type="checkbox" id='フレッシュモッツァレラチーズ' value="" />フレッシュモッツァレラチーズ</label>
                    <label htmlFor='イタリアンソーセージ'><input type="checkbox" id='イタリアンソーセージ' value="" />イタリアンソーセージ</label>
                    <label htmlFor='ガーリックスライス'><input type="checkbox" id='ガーリックスライス' value="" />ガーリックスライス</label>
                    <label htmlFor='あらびきスライスソｰセｰジ'><input type="checkbox" id='あらびきスライスソｰセｰジ' value="" />あらびきスライスソｰセｰジ</label>
                    <label htmlFor='ブロッコリー'><input type="checkbox" id='ブロッコリー' value="" />ブロッコリー</label>
                    <label htmlFor='グリーンアスパラ'><input type="checkbox" id='グリーンアスパラ' value="" />グリーンアスパラ</label>
                    <label htmlFor='パルメザンチーズ'><input type="checkbox" id='パルメザンチーズ' value="" />パルメザンチーズ</label>
                    <label htmlFor='パイナップル'><input type="checkbox" id='パイナップル' value="" />パイナップル</label>
                    <label htmlFor='ハラペーニョ'><input type="checkbox" id='ハラペーニョ' value=""/>ハラペーニョ</label>
                    <label htmlFor='もち'><input type="checkbox" id='もち' value="" />もち</label>
                    <label htmlFor='ポテト'><input type="checkbox" id='ポテト' value="" />ポテト</label>
                    <label htmlFor='ブラックオリーブ'><input type="checkbox" id='ブラックオリーブ' value="" />ブラックオリーブ</label>
                    <label htmlFor='チーズ増量'><input type="checkbox" id='チーズ増量' value="" />チーズ増量 </label>
                </div>
            </div>
            <div>
                <div>数量:</div>
                <div><select name="number">
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
            <div>この商品の合計金額：円(税抜)</div>
            <div>
                <button onClick={cartButton}>カートに入れる</button>
            </div>
        </div>
            
    )
} 

export default CurryDetail