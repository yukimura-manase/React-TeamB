import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const OrderFinish = () => {
    
    const history = useHistory();
    const handleLink = path => history.push(path);

    return (
        <div>

            <div className="container">		
                <div>
                    <div>
                    <h1>ThankYou!!</h1>
                    <h3>決済が完了しました！</h3>
                        <div>
                            <p>この度はご注文ありがとうございます。</p>
                        </div>
                    </div>
                </div>

                <div>
                    <div>					
                        <button >トップ画面を表示する</button>			
                    </div>
                </div>
            </div>
        </div>
    )
}