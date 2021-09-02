import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, } from "../actions/ActionCreator";
// import { OrderFinish } from "./orderFinish";
// import {
// 	BrowserRouter as Router,
// 	Switch,
// 	Route,
// 	Link
//   } from 'react-router-dom' // Router設定仮置き

export const BuyHistory = () => {

	const todosSelector = state => state.StoreState.carts;

	const carts = useSelector (todosSelector)
	const dispatch = useDispatch ()

    const history = useHistory();
    const handleLink = path => history.push(path);


	const
	[ name, setName ] = useState(""),
	[ size, setSize ] = useState(""),
	[ topping, setTopping ] = useState(""),
	[ total, setTotal ] = useState("");


	const inputName = (e) => {
		setName(e.target.value);
	  };
	  const inputSize = (e) => {
		setSize (e.target.value);
		// console.log(inputTName);
	  };
	  const inputTopping = (e) => {
		setTopping (e.target.value);
		// console.log(inputTextArea);
	  };
	  const inputTotal = (e) => {
		setTotal(e.target.value);
	  };


	  const addTodos = () => {
		// let add = [];
		// if ( userName === '') { add.push('名前を入力してください') }
		// if ( mailAddress === '') { add.push('アドレスを入力してください') }
		// else if( !attmark.test(mailAddress) ){ add.push('メールアドレスの形式が不正です') }
		// if ( addressNumber === '') { add.push('郵便番号を入力してください') }
		// else if( !attmark.test(addressNumber) ){ add.push('郵便番号はXXX-XXXXの形式で入力してください') }
		// if ( address == ""){ add.push("住所を入力してください") }
		// if ( phoneNumber == ""){ add.push("電話番号を入力してください") }
		// else if(!denwa.test(this.humans.tel)){ this.Validation.push("電話番号はXXXX-XXXX-XXXXの形式で入力してください") }
		// if(this.humans.orderDate == ""){ this.Validation.push("配送日を入力してください") }
		// if(this.humans.orderTime == 0){ this.Validation.push("配送時間を入力してください") }
		// if(time  <= 3 && dateDiff < 1 ){ this.Validation.push("今から3時間後の日時をご入力ください") }
		// if(this.humans.status == 0){ this.Validation.push("支払い方法を選択してください") }	

			dispatch ( addTodo ( name, size, topping, total ) )

		// } else {
		// 	alert ( `${add}の入力が足らないよ！` )
		// }

		console.log( addTodo ( name, size, topping, total  ));
	  }
	
	const setCart = carts.map( (cart, index) => {
		return (
			<div key={index}>
				<td> {cart.id}</td>
				<td> {cart.name}</td>
				<td> {cart.size}</td>
				<td> {cart.topping}</td>
				<td> {cart.total}</td>
			</div>

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

                        
						<tr>{setCart}</tr>				
					</tbody>
				</table>
			</div>

			<div>
                <div>消費税 : xxx 円</div>
				<div>注文金額 (税込) : xxx 円</div>
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
								<input type="text" />
							</td>
						</tr>

						<tr>
							<td>
								メールアドレス
							</td>
							<td>
								<input type="text" />
							</td>
						</tr>

						<tr>
                            <td>
								<div className="text-center">
									郵便番号
								</div>
							</td>
							<td>
								<input type="text" />&nbsp;&nbsp;<button>住所検索</button>
							</td>
						</tr>

						<tr>
							<td>
								<div className="text-center">
									住所
								</div>
							</td>
							<td>
								<input type="text" />
							</td>
						</tr>
							
						<tr>
							<td>
								<div className="text-center">
									住所
								</div>
							</td>
							<td>
								<input type="text" />
							</td>
						</tr>

						<tr>
						    <td>
								<div className="text-center">
									電話番号
								</div>
							</td>
							<td>
								<input type="text" />
							</td>
						</tr>

						<tr>
						    <td>
								<div className="text-center">
									住所
								</div>
							</td>
							<td>
								<input type="text" />
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
								    <input type="date" />
								</div>
								<div>
									<input type="radio" name="time" value="10" />10時
									<input type="radio" name="time" value="11" />11時
									<input type="radio" name="time" value="12" />12時
									<input type="radio" name="time" value="13" />13時
									<input type="radio" name="time" value="14" />14時
									<input type="radio" name="time" value="15" />15時
									<input type="radio" name="time" value="16" />16時
									<input type="radio" name="time" value="17" />17時
									<input type="radio" name="time" value="18" />18時
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
								<input type="radio" name="pay" value="1" />代金引換
							</td>
						</tr>

						<tr>
							<td>
								クレジットカード決済
							</td>
							<td>
								<input type="radio" name="pay" value="2" />クレジットカード決済
							</td>
						</tr>
						</tbody>
					</table>
				</div>
			</div>


			<div>
				<button onClick={()=>handleLink('/orderFinish'), addTodos}>注文</button>
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