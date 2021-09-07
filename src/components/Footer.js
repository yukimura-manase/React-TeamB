import React from "react"
//materialUI
import { createStyles,makeStyles } from '@material-ui/styles';

const useStyle = makeStyles(() =>
    createStyles({
        "footer":{
            backgroundColor:"#faa61a",
            textAlign:"right",
            height:"50px",
 
            bottom: 0 /*下に固定*/
           
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