import React, { useState, useEffect } from "react";
import '../../src/OrderFinish.css';
import { createStyles,makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import {
    useHistory,
    BrowserRouter as Router,
} from 'react-router-dom' 
import { TextField } from '@material-ui/core';






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


export const OrderFinish = () => {
    
    const history = useHistory();
    const handleLink = path => history.push(path);


    const classes = useStyle();



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
                        <div>
                            <p>ラクラクカリーをご利用頂きましてありがとうございます。</p>
                            <p>決済は正常に完了しました。</p>
                        </div>
                    </div>


                    <div className="button-position">					
                        <Button variant="contained" className={classes.button}  onClick={()=>handleLink('/') }><img src={ `${process.env.PUBLIC_URL}/img/home.png` } />&nbsp;&nbsp;戻る</Button>			
                    </div>

                <div>
                    <img className="town-line" src={ `${process.env.PUBLIC_URL}/img/town.png` } />
                </div>


                <div style={{ padding: 10 }}>
        <TextField
          id="zipcode"
          label="郵便番号"
          variant="outlined"
          placeholder="XXX-XXXX"
          value={zipCode}
          onChange={(e) => {
            setZipCode(e.target.value);
          }}
        />
      </div>
      <div style={{ padding: 10 }}>
        <TextField
          id="address"
          label="住所"
          variant="outlined"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
      </div>


                </div>
            </div>



        


        </div>

        
        

        
    )
}

<script src="https://yubinbango.github.io/yubinbango/yubinbango.js" charset="UTF-8"></script>



// export default OrderFinish;