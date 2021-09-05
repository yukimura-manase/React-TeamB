import React, { useState, useEffect } from "react";
import firebase from 'firebase/compat/app'
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addData } from "../actions/ActionCreator";
import '../../src/BuyHistory.css';
import { createStyles,makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import AcUnitIcon from '@material-ui/icons/AcUnit'; // importの後のこ指定   ex:) <AcUnitIcon/>


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
	}),
);


const cartSelector = state => {
console.log(state.StoreState.Cart);

	return state.StoreState.Cart;
}

export const BuyHistory = () => {

	// const cartSelector = state => state.StoreState.Cart.cartItem;

	const getCart = useSelector (cartSelector)
	console.log(getCart);
	const dispatch = useDispatch ()

    const history = useHistory();
    const handleLink = path => history.push(path);


	const classes = useStyle();


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
	[ errors, setErrors ] = useState([]),
	[ cart, setCart ] = useState([])
	// [ first, setItems ] = useState ('');

	// console.log(getCart);
	// useEffect(()=>{
	// 	console.log(getCart);
	// 	getCart.length !== 0 && setCart(getCart[0].cartItem.cartItemList)
	// }, [getCart])

	// console.log(getCart);

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
		if ( userName === "" ) {
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
	
	
	const displaysCart = cart.map( (item, index) => {
		return (
			
			<tr className="cart-item" key={index}>
				<td> {item.name} <div><img src={item.pic} /></div></td>
				<td> {item.size} </td>
				<td> {item.number} </td>
				<td> {item.topping} </td>
				<td> {item.total} </td>
			</tr>

		)
	})
	



    return (

        <div>

            <div className="main-title">注文確認画面</div>

			<div className="container">
            <div className="box1-title">ショッピングカート</div>
			</div>


			<div className="container">
			<div>

				<table>
					<tbody>
						<tr className="cart-title">
							<th>商品名</th>
							<th>サイズ</th>
                            <th>数量</th>
							<th>トッピング</th>
                            <th>価格(税抜)</th>
						</tr>

						
						{/* {displaysCart} */}

						
				
					</tbody>
				</table>
			</div>
			</div>

			<div className="container">
				<div className="tax">消費税 : 200 円</div>
			</div>




			<div className="container">
				<div className="total-price">注文金額 (税込) : 2200 円</div>
            </div>





			
			<div className="box2">

				<div className="box2-title">お届け先情報</div>


				<div className="container">

					<table>
						<tbody>
								<tr>
									<td>
									<div>お名前<span className="must"/></div>
									<div>
										<input className="input" type="text" value={userName} onChange={inputUserName} placeholder="カレー太郎" />
									</div>
									</td>
								</tr>


								<tr>
									<td>
									<div>メールアドレス<span className="must"/></div>
									<div>
										<input className="input" type="text" value={mailAddress} onChange={inputMailAddress} placeholder="curry@xxxx.com"  />
									</div>
									</td>
								</tr>


								<tr>
									<td>
									<div>郵便番号<span className="must"/></div>
									<div>
										<input className="input" type="text" value={addressNumber} onChange={inputAddressNumber} placeholder="123-4567" />
									</div>
									</td>
								</tr>


								<tr>
									<td>
									<div>住所<span className="must"/></div>
									<div>
										<input className="input" type="text" value={address} onChange={inputAddress} placeholder="○○県○○市○○ 0-0-0"  />
									</div>
									</td>
								</tr>
								

								<tr>
									<td>
									<div>電話番号<span className="must"/></div>
									<div>
										<input className="input" type="text" value={phoneNumber} onChange={inputPhoneNumber} placeholder="000-0000-0000"  />
									</div>
									</td>
								</tr>


								<tr>
									<td>
									<div>配達日時<span className="must"/></div>
									<div>
										<input className="input" type="date" value={deliveryDate} onChange={inputDeliveryDate} />
									</div>
									<div className="time">
										<div className="time-item"><input type="radio" name="time" value="10" onChange={inputDeliveryTime} id="r10"/><label htmlFor="r10">&nbsp;10時</label></div>
										<div className="time-item"><input type="radio" name="time" value="11" onChange={inputDeliveryTime} id="r11"/><label htmlFor="r11">&nbsp;11時</label></div>
										<div className="time-item"><input type="radio" name="time" value="12" onChange={inputDeliveryTime} id="r12"/><label htmlFor="r12">&nbsp;12時</label></div>
										<div className="spacer"></div>
										<div className="time-item"><input type="radio" name="time" value="13" onChange={inputDeliveryTime} id="r13"/><label htmlFor="r13">&nbsp;13時</label></div>
										<div className="time-item"><input type="radio" name="time" value="14" onChange={inputDeliveryTime} id="r14"/><label htmlFor="r14">&nbsp;14時</label></div>
										<div className="time-item"><input type="radio" name="time" value="15" onChange={inputDeliveryTime} id="r15"/><label htmlFor="r15">&nbsp;15時</label></div>
										<div className="spacer"></div>
										<div className="time-item"><input type="radio" name="time" value="16" onChange={inputDeliveryTime} id="r16"/><label htmlFor="r16">&nbsp;16時</label></div>
										<div className="time-item"><input type="radio" name="time" value="17" onChange={inputDeliveryTime} id="r17"/><label htmlFor="r17">&nbsp;17時</label></div>
										<div className="time-item"><input type="radio" name="time" value="18" onChange={inputDeliveryTime} id="r18"/><label htmlFor="r18">&nbsp;18時</label></div>
									</div>
									</td>
								</tr>

						</tbody>
					</table>

				</div>
			</div>





			<div className="box2">

				<div className="box2-title">お支払い方法</div>

				<div className="container">
					<table>
						<tbody>

						<tr>
							<td>
								お支払い方法を選択してください。<span className="must"/>
							</td>
						</tr>
						<tr>
							<td>
								<input type="radio" name="pay" value="1" onChange={inputStatus} id="cashOnDelivery"/><label htmlFor="cashOnDelivery">代金引換</label>
							</td>
						</tr>
						<tr>
							<td>
								<input type="radio" name="pay" value="2" onChange={inputStatus} id="credit" /><label htmlFor="credit">クレジットカード決済</label>
							</td>
						</tr>

						</tbody>
					</table>
				</div>
			</div>

			<div className="container">
			<div className="error">
					{ errors.map( (error) => (
					<div key={error.id}>{error}</div>
					))}
			</div>
			</div>


			<div className="order-button">
				<Button　className={classes.button} onClick={ Validation } variant="contained" > 注文 </Button>
			</div>

		</div>




    )

}


// export default BuyHistory;