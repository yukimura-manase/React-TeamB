import React from "react"
//materialUI
import { createStyles,makeStyles } from '@material-ui/styles';

const useStyle = makeStyles(() =>
    createStyles({
        "footer":{
            backgroundColor:"#faa61a",
            textAlign:"right",
            height:"50px",
            // padding:0, /*　追加*/
            // margin:0,
            // bottom: 0, /*下に固定*/
            // marginTop:"auto"
    bottom:0            
           
        },
    }),
);
    

const Footer = () => {
    const classes = useStyle();

    return(
            <footer className={classes.footer}>
                    &copy;202107FR_React開発演習_チームB
            </footer>
    )
}
export default Footer