import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const BuyHistory = () => {

    const history = useHistory();
    const handleLink = path => history.push(path);

    return (
        <div>
            <h1>注文確認画面</h1>

            <div>
            <h3>ショッピングカート</h3>
				<table>
					<tbody >
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
							<td> 
                                ピザの名前<br/>画像がくるよ！					
							</td>
							<td>
								M
							</td>
                            <td>
								２
							</td>
                            <td>
                                チーズ
							</td>
							<td>
								xxxx 円
							</td>
						</tr>				
					</tbody>
				</table>

                <div>消費税 : xxx 円</div>
                
            </div>

        </div>
    )

}


export default BuyHistory;