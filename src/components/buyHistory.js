import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchItem, fetchCartItem } from "../actions/ActionCreator";
// import { OrderFinish } from "./OrderFinish";
// import {
// 	BrowserRouter as Router,
// 	Switch,
// 	Route,
// 	Link
//   } from 'react-router-dom' // Router設定仮置き
const cartSelector = state => state.StoreState.Cart;

export const BuyHistory = () => {

	// const cartSelector = state => state.StoreState.Cart.cartItem;

	const cartItem = useSelector (cartSelector)
	console.log(cartItem);
	const dispatch = useDispatch ()

    const history = useHistory();
    const handleLink = path => history.push(path);


//支払い情報の変数たち
	const
	[ userName, setUserName ] = useState(""),
	[ address, setAddress ] = useState(""),
	[ addressNumber, setAddressNumber ] = useState(""),
	[ phoneNumber, setPhoneNumber ] = useState(""),
	[ deliveryDate, setDeliveryDate ] = useState(""),
	[ deliveryTime, setDeliveryTime ] = useState(""),
	[ mailAddress, setMailAddress ] = useState(""),
	[ status, setStatus ] = useState(""),
	[ errors, setErrors ] = useState([]);

	// [ item, setItems ] = useState ([]);


	//イベント発火時に値を持ってくるよ！
	const inputUserName = (e) => {
		setUserName(e.target.value);
	};
	const inputAddress = (e) => {
		setAddress (e.target.value);
	};
	const inputAddressNumber = (e) => {
		setAddressNumber (e.target.value);
	};
	const inputPhoneNumber = (e) => {
		setPhoneNumber(e.target.value);
	};
	const inputDeliveryDate = (e) => {
		setDeliveryDate (e.target.value);
	};
	const inputDeliveryTime = (e) => {
		setDeliveryTime(e.target.value);
	};
	const inputMailAddress = (e) => {
		setMailAddress(e.target.value);
	};
	const inputStatus = (e) => {
		setStatus(e.target.value);
	};
	const inputErrors = (e) => {
		setErrors(e.target.value);
	};

	// const inputItems = (e) => {
	// 	setItems(e.target.value);
	// };


	//バリデーション
	const attmark = ( mailAddress ) => {
		let val = (/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/); 
		return val.test ( mailAddress );
	}

	const yuubin = ( addressNumber ) => {
		let val = (/^\d{3}-\d{4}$/);
		return val.test ( addressNumber );
	}

	const denwa = ( phoneNumber ) => {
		let val = (/^0\d{1,4}-\d{1,4}-\d{3,4}$/);
		return val.test ( phoneNumber );
	}

	// const order = ( deliveryDate ) => {

	// }


	//エラーの処理
	const Validation = (e) => {
		setErrors('') //対象にする配列を空にしてあげる
		let allErrors = [];


		//お名前エラー
		if ( userName == "" ) {
			allErrors.push("名前を入力してください")
		}

		//アドレスエラー
		if ( mailAddress == "" ) {
			allErrors.push("アドレスを入力してください") }
		else if( !attmark( mailAddress ) ) {
			allErrors.push("メールアドレスの形式が不正です") }

		//郵便番号エラー
		if ( addressNumber == "" ) {
			allErrors.push("郵便番号を入力してください")
		} else if ( !yuubin(addressNumber) ) {
			allErrors.push("郵便番号はXXX-XXXXの形式で入力してください") }

		//住所エラー
		if ( address == "" ) {
			allErrors.push("住所を入力してください") }

		//TELエラー
		if ( phoneNumber == "" ) {
			allErrors.push("電話番号を入力してください")
		} else if (!denwa(phoneNumber)) {
			allErrors.push("電話番号はXXXX-XXXX-XXXXの形式で入力してください")
		}

		//お届け日エラー
		if( deliveryDate == "" ) {
			allErrors.push("配送日を入力してください")
		}

		//お届け時間エラー
		if( !deliveryTime ) {
			allErrors.push("配送時間を入力してください")
		}

		// //時間指定エラー
		// if(time  <= 3 && dateDiff < 1 ){ allErrors.push("今から3時間後の日時をご入力ください") }

		//お支払いエラー
		if( !status ) {
			allErrors.push("支払い方法を選択してください")
		}	


		setErrors(allErrors);
				
	}
	



	const addFetchCartItem = () => {

			dispatch ( fetchCartItem ( ) )

		console.log( fetchCartItem ( ));
	}
	
	
	// const displaysCart = cartItem.cartItemList.map( (item, index) => {
	// 	return (
			
	// 		<div key={index}>
	// 			<div> {item.id}</div>
	// 			<div> {item.userName}</div>
	// 			<div> {item.address}</div>
	// 			<div> {item.addressNumber}</div>
	// 			<div> {item.deliveryDate}</div>
	// 			<div> {item.deliveryTime}</div>
	// 			<div> {item.mailAddress}</div>
	// 			<div> {item.deliveryDate}</div>
	// 			<div> {item.deliveryTime}</div>
	// 			<div> {item.mailAddress}</div>
	// 		</div>

	// 	)
	// })
	



    return (

        <div>

            <h1>注文確認画面</h1>

            <div>
                <h3>ショッピングカート</h3>
			</div>

			<div>

				<table>
					<tbody>
						<tr>
							<th>
								<div className="text-center">
									商品名
								</div>
							</th>
							<th>
								<div className="text-center">
									サイズ
								</div>
							</th>
                            <th>
								<div className="text-center">
									数量
								</div>
							</th>
							<th>
								<div className="text-center">
									トッピング
								</div>
							</th>
                            <th>
								<div className="text-center">
									価格(税抜)
								</div>
							</th>
						</tr>

						<tr>
							<th>
								<div className="text-center">
									かれーーー
								</div>
							</th>
							<th>
								<div className="text-center">
									M
								</div>
							</th>
                            <th>
								<div className="text-center">
									1
								</div>
							</th>
							<th>
								<div className="text-center">
									チース
								</div>
							</th>
                            <th>
								<div className="text-center">
									2000円
								</div>
							</th>
						</tr>
				
					</tbody>
				</table>
			</div>

			<div>
                <div>消費税 : 200 円</div>
				<div>注文金額 (税込) : 2200 円</div>
            </div>

			<div>
				<div>
					<h3>お届け先情報</h3>
				</div>

				{/* <div>{displaysCart}</div> */}
				
				<div>
					<table>
						<tbody>				
					
						<tr>
							<td>
								<div className="text-center">
									お名前
								</div>
							</td>
							<td>
								<input type="text" value={userName} onChange={inputUserName} />
							</td>
						</tr>

						<tr>
							<td>
								メールアドレス
							</td>
							<td>
								<input type="text" value={mailAddress} onChange={inputMailAddress} />
							</td>
						</tr>

						<tr>
                            <td>
								<div className="text-center">
									郵便番号
								</div>
							</td>
							<td>
								<input type="text" value={addressNumber} onChange={inputAddressNumber}/>&nbsp;&nbsp;<button>住所検索</button>
							</td>
						</tr>

						<tr>
							<td>
								<div className="text-center">
									住所
								</div>
							</td>
							<td>
								<input type="text" value={address} onChange={inputAddress} />
							</td>
						</tr>
							

						<tr>
						    <td>
								<div className="text-center">
									電話番号
								</div>
							</td>
							<td>
								<input type="text" value={phoneNumber} onChange={inputPhoneNumber} />
							</td>
						</tr>

						
                        <tr>
						    <td>
								<div className="text-center">
									配達日時
								</div>
							</td>
							<td>
								<div>
								    <input type="date" value={deliveryDate} onChange={inputDeliveryDate} />
								</div>
								<div>
									<input type="radio" name="time" value={deliveryTime} onClick={inputDeliveryTime} />10時
									<input type="radio" name="time" value={deliveryTime} onClick={inputDeliveryTime} />11時
									<input type="radio" name="time" value={deliveryTime} onClick={inputDeliveryTime} />12時
									<input type="radio" name="time" value={deliveryTime} onClick={inputDeliveryTime} />13時
									<input type="radio" name="time" value={deliveryTime} onClick={inputDeliveryTime} />14時
									<input type="radio" name="time" value={deliveryTime} onClick={inputDeliveryTime} />15時
									<input type="radio" name="time" value={deliveryTime} onClick={inputDeliveryTime} />16時
									<input type="radio" name="time" value={deliveryTime} onClick={inputDeliveryTime} />17時
									<input type="radio" name="time" value={deliveryTime} onClick={inputDeliveryTime} />18時
								</div>
							</td>
						</tr>
						
						</tbody>
					</table>
				</div>
			</div>


			<div>
				<div>
					<h3>お支払い方法</h3>
				</div>

				<div>
					<table>
						<tbody>
						<tr>
							<td>
								代金引換
							</td>
							<td>
								<input type="radio" name="pay" value={status} onClick={inputStatus} />代金引換
							</td>
						</tr>

						<tr>
							<td>
								クレジットカード決済
							</td>
							<td>
								<input type="radio" name="pay" value={status} onClick={inputStatus} />クレジットカード決済
							</td>
						</tr>
						</tbody>
					</table>
				</div>
			</div>

			<div>
				{ errors.map( (error) => (
					<div key={error.id}>{error}</div>
				))}
			</div>


			<div>
				<button onClick={()=>handleLink('/orderFinish'), Validation } >注文</button>
				{/* <Link to='/orderFinish'>注文</Link> */}
				{/* <OrderFinish/> */}
			</div>

			{/* <Switch>
				<Route path='/orderFinish' exact><OrderFinish /></Route>
			</Switch>
 */}
	</div>

    )

}


// export default BuyHistory;