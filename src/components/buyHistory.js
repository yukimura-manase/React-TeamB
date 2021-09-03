import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addData } from "../actions/ActionCreator";
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

	// [ first, setItems ] = useState ('');


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

	const order = ( deliveryDate ) => {
		let today = new Date()//今日の日付

		today = new Date (
			today.getFullYear(), //年
			today.getMonth(), //月
			today.getDate(), //日
			today.getHours(), //時間
		)

		let hopeDate = new Date(deliveryDate)
		let nowDay =  today.getDate()
		let date = new Date(hopeDate)

		hopeDate = new Date (
			today.getMonth(), //月
			today.getDate(), //日
		)

		let selectDay = date.getDate()　//お届け希望の日付
		let nowHour = today.getHours() //現在の時間
		let i = Math.abs( deliveryTime - nowHour ) //お届け希望の時間 - 今の時間

		//同じ日の処理
		if ( nowDay === selectDay ) {
			if ( deliveryTime <= nowHour ) {
				return false
			} else if ( 3 <= i ) { //今の時間以降の場合
				return true
			} else {
				return false
			}
		}
	

		//違う日の処理 ( 昨日以前 or 明日以降 )
		else if ( nowDay >= selectDay ) {
			return false
		} else {
			return true
		}
	}

	

	// const dt = new Date();
	// 	let hours = dt.getHours();		
		
	// 	let dateDiff = new Date(deliveryTime.orderDate).getDate() - dt.getDate();				
	// 	let time = deliveryTime.orderTime - hours





	//エラーの処理
	const Validation = (e) => {
		setErrors('') //対象にする配列を空にしてあげる
		let allErrors = [];


		//お名前エラー
		if ( userName == "" ) {
			allErrors.push("名前を入力してください")
		}

		//アドレスエラー
		if ( mailAddress === "" ) {
			allErrors.push("アドレスを入力してください") }
		else if( !attmark( mailAddress ) ) {
			allErrors.push("メールアドレスの形式が不正です") }

		//郵便番号エラー
		if ( addressNumber === "" ) {
			allErrors.push("郵便番号を入力してください")
		} else if ( !yuubin(addressNumber) ) {
			allErrors.push("郵便番号はXXX-XXXXの形式で入力してください") }

		//住所エラー
		if ( address === "" ) {
			allErrors.push("住所を入力してください") }

		//TELエラー
		if ( phoneNumber === "" ) {
			allErrors.push("電話番号を入力してください")
		} else if (!denwa(phoneNumber)) {
			allErrors.push("電話番号はXXXX-XXXX-XXXXの形式で入力してください")
		}

		//お届け日エラー
		if( deliveryDate === "" ) {
			allErrors.push("配送日を入力してください")
		}
		//時間指定エラー
		else if ( !order(deliveryDate) ) {
			allErrors.push("今から3時間後の日時をご入力ください") }

		//お届け時間エラー
		if( deliveryTime === "" ) {
			allErrors.push("配送時間を入力してください")
		}


		//お支払いエラー
		if( !status ) {
			allErrors.push("支払い方法を選択してください")
		}	


		setErrors(allErrors);

		if ( allErrors.length === 0 ) {
			dispatch ( addData (
				// orderDate,
				userName,
				mailAddress,
				addressNumber,
				address,
				phoneNumber,
				deliveryDate,
				deliveryTime,
				status) )
			console.log('テスト')
			handleLink('/orderFinish')
		}
		console.log(addData (
			// orderDate,
			userName,
			mailAddress,
			addressNumber,
			address,
			phoneNumber,
			deliveryDate,
			deliveryTime,
			status));
				
	}
	



	// const addFetchCartItem = () => {

	// 		dispatch ( fetchCartItem ( ) )

	// 	console.log( fetchCartItem ( ));
	// }
	
	
	const displaysCart = cartItem[0].cartItem.cartItemList.map( (item, index) => {
		return (
			
			<tr key={index}>
				<td> {item.name} <div><img src={item.pic} /></div></td>
				<td> {item.size} </td>
				<td> {item.number} </td>
				<td> {item.topping} </td>
				<td> {item.total} </td>
				{/* <div> {item.userName}</div>
				<div> {item.address}</div>
				<div> {item.addressNumber}</div>
				<div> {item.deliveryDate}</div>
				<div> {item.deliveryTime}</div>
				<div> {item.mailAddress}</div>
				<div> {item.deliveryDate}</div>
				<div> {item.deliveryTime}</div>
				<div> {item.mailAddress}</div> */}
			</tr>

		)
	})
	



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

						
						{displaysCart}
							{/* <th>
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
							</th> */}
						
				
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
									<input type="radio" name="time" value="10" onChange={inputDeliveryTime} />10時
									<input type="radio" name="time" value="11" onChange={inputDeliveryTime} />11時
									<input type="radio" name="time" value="12" onChange={inputDeliveryTime} />12時
									<input type="radio" name="time" value="13" onChange={inputDeliveryTime} />13時
									<input type="radio" name="time" value="14" onChange={inputDeliveryTime} />14時
									<input type="radio" name="time" value="15" onChange={inputDeliveryTime} />15時
									<input type="radio" name="time" value="16" onChange={inputDeliveryTime} />16時
									<input type="radio" name="time" value="17" onChange={inputDeliveryTime} />17時
									<input type="radio" name="time" value="18" onChange={inputDeliveryTime} />18時
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
								<input type="radio" name="pay" value="1" onChange={inputStatus} />代金引換
							</td>
						</tr>

						<tr>
							<td>
								クレジットカード決済
							</td>
							<td>
								<input type="radio" name="pay" value="2" onChange={inputStatus} />クレジットカード決済
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
				<button onClick={ Validation } >注文</button>
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