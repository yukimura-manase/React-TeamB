import React, { useState, useEffect } from "react";
import '../../src/OrderFinish.css';
import { createStyles,makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { useSelector } from "react-redux";
import {
    useHistory,
    BrowserRouter as Router,
} from 'react-router-dom' 







const useStyle = makeStyles(() =>
    createStyles({
		"button":{
            borderColor:"#faa61a",
            color:"#302bla",
            fontWeight:600,
            marginTop: "3%",
            marginBottom:"5%",
            backgroundColor:"#fff",
            padding:"10px",
            "&:hover":{
                backgroundColor:"#faa61a",
                color:"#fff"
            }
        },
	}),
);

const loginSelector = state=>{ // Storeのログインユーザー情報
    return state.StoreState.loginUser
}


export const OrderFinish = () => {
    
    const history = useHistory();
    const handleLink = path => history.push(path);


    const classes = useStyle();

    const user = useSelector(loginSelector)



    const [zipCode, setZipCode] = useState('');
    const [address, setAddress] = useState('');
    useEffect(() => {
      if (zipCode) {
        fetch(`https://api.zipaddress.net/?zipcode=${zipCode}`, {
          mode: 'cors',
        })
          .then((result) => {
            return result.json();
          })
          .then((result) => {
            setAddress(result.data?.fullAddress || '');
          });
      }
    }, [zipCode]);


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
                        {
                             user === null ? 
                             <div>
                                <h2>らくらくカレーをご利用頂きましてありがとうございます。</h2>
                                <h3>決済は正常に完了しました。</h3>
                            </div>:
                            <div>
                                <h2>{user.displayName}さん、らくらくカレーをご利用頂きましてありがとうございます。</h2>
                                <span><img src={user.photoURL}></img></span>
                            <h3>決済は正常に完了しました。</h3>
                        </div>
                        }
                    </div>


                    <div className="button-position">					
                        <Button variant="contained" className={classes.button}  onClick={()=>handleLink('/') }><img src={ `${process.env.PUBLIC_URL}/img/home.png` } />&nbsp;&nbsp;戻る</Button>			
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