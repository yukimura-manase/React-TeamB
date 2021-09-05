import { useHistory } from "react-router-dom";
import '../../src/OrderFinish.css';
import { createStyles,makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';


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