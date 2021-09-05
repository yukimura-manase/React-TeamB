import { useHistory } from "react-router-dom";
import '../../src/OrderFinish.css';


export const OrderFinish = () => {
    
    const history = useHistory();
    const handleLink = path => history.push(path);

    return (
        <div>

            <div className="container">		
                <div>


                    <div className='message-title'>Thank You</div>
                    <div className='icon-line'>
                        <img src={ `${process.env.PUBLIC_URL}/img/onion.png` } />&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src={ `${process.env.PUBLIC_URL}/img/carrot.png` } />&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src={ `${process.env.PUBLIC_URL}/img/potato.png` } />&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src={ `${process.env.PUBLIC_URL}/img/meat.png` } />&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src={ `${process.env.PUBLIC_URL}/img/curry.png` } />&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src={ `${process.env.PUBLIC_URL}/img/kok.png` } />&nbsp;&nbsp;&nbsp;&nbsp;
                        
                    </div>


                    <div className='message'>
                        <div>
                            <p>らくらくカレーをご利用頂きましてありがとうございます。</p>
                            <p>決済は正常に完了しました。</p>
                        </div>
                    </div>


                    <div className="button-position">					
                        <button className="button"  onClick={()=>handleLink('/')}><img src={ `${process.env.PUBLIC_URL}/img/home.png` } />&nbsp;&nbsp;戻る</button>			
                    </div>

                <div>
                    <img className="town-line" src={ `${process.env.PUBLIC_URL}/img/town.png` } />
                </div>


                </div>
            </div>


        </div>
        

        
    )
}





// export default OrderFinish;