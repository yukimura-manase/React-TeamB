import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchItem, addLike } from '../actions/ActionCreator';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
//materialUI
import { createStyles, makeStyles } from '@material-ui/styles';

const useStyle = makeStyles(() =>
    createStyles({
        "button": {
            borderColor: "#faa61a",
            color: "#faa61a",
            fontWeight: 600,
            marginBottom: "8px",
            backgroundColor: "#fff",
            padding: "10px",
            "&:hover": {
                backgroundColor: "#faa61a",
                color: "#fff"
            }
        },
        "search": {
            textAlign: "center"
        },
        "card": {
            width: "350px",
            background: "#FFF",
            borderRadius: "5px",
            boxShadow: "0 2px 5px #ccc",
            marginBottom: "40px",
        },
        "card-list": {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            justifyContent: "space-evenly",
            height: "auto",
            width: "auto",
            padding: "5%",

        },
        "card-content": {
            padding: "20px",
            textAlign: "center",
            fontWeight: 700,

        },
        "card-title": {
            fontSize: "20px",
            fontWeight: 700,
            marginTop: "20px",
            marginBottom: "20px",
            textAlign: "center"
        },
        "card-picutre": {
            width: "350px",
            height: "200px"

        },
        "text":{
            width:"250px",
            height:"35px",
            marginRight:"15px"            
        },
        "clearButton": {
            borderColor: "#faa61a",
            color: "#faa61a",
            fontWeight: 600,
            // marginBottom: "8px",
            backgroundColor: "#fff",
            padding: "10px",
            marginLeft:"15px",
            "&:hover": {
                backgroundColor: "#faa61a",
                color: "#fff"
            }
        },
        "randombutton": {
            borderColor: "#faa61a",
            color: "#faa61a",
            fontWeight: 600,
            marginBottom: "8px",
            backgroundColor: "#fff",
            padding: "10px",
            "&:hover": {
                backgroundColor: "#faa61a",
                color: "#fff"
            }
        },

    }),
);

// export const curryItem = state => {
// import { StoreState } from '../reducers/StoreState';

const cartSelector = state => { 
    return state.StoreState.Cart
}


const loginSelector = state=>{ 
    return state.StoreState.loginUser
}

const curryItem = state =>{
    return state.StoreState.Curry
}

export const Product =()=>{

    const pullcurry =useSelector(curryItem) //curryだったりpullcurryだったりする

    const user = useSelector(loginSelector)

    const storeCart = useSelector(cartSelector)


    const classes = useStyle()

    const history=useHistory()

    const handleLink = path => history.push(path)
    
    const [curry, Setcurry] = useState([])

    // 追加機能
    const dispatch = useDispatch() 

    const likeAdd = (curry)=>{
        alert('お気に入りに追加しました！')

        dispatch(addLike(curry))
    }

    const [word, Setword] = useState('')
    
    useEffect(() => {
        Setcurry(pullcurry)
    })

    const handleName = (e) => {
        Setword(e.target.value)
    }

    const [newCurry, setNewCurry] = useState([])

    const serchCurry = () => {
        let currys = (curry.filter(
            function (value) {
                if (value.name.indexOf(word) > -1) {
                    return 1
                }
            },
        ))
        if (currys.length === 0) {
            alert('該当する商品はありません')
        }
        setNewCurry(currys)
    }

    const clear = () => {
        Setword('')
    }

    const High = () => {
        const high = curry.sort((a, b) => {
            return b.msizePrice - a.msizePrice
        })
        console.log(curry)
        Setcurry([...curry,high])
    }
    const Low = () => {
        const low = curry.sort((a, b) => {
            return a.msizePrice - b.msizePrice
        })
        console.log(curry)
        Setcurry([...curry,low])
    }

    const[ randomcurry, setRandom ] = useState('')
    const[ randompic,setRandom2 ]=useState('')

    const randomCurry=()=>{
        let random=curry[Math.floor(Math.random() * curry.length )]
        setRandom(`本日のオススメ  ${random.name}`)
        setRandom2(random.pic)
    }
    
const ChangeCurry = () => {
    if (newCurry.length === 0) {
        return (
            curry.map((curry) => {
                return <div>
                    <div>
                        <div key={curry.id} className={classes.card}>
                            <div className={classes['card-title']}>{curry.name}</div>
                            <div><img src={curry.pic} alt='' onClick={() => handleLink(`currydetail/${curry.id}`)} className={classes['card-picutre']} /></div>
                            <div className={classes['card-content']}>
                                <div>Mサイズ:{curry.msizePrice}円</div>
                                <div>Lサイズ:{curry.lsizePrice}円</div>
                                <button onClick={() => handleLink(`currydetail/${curry.id}`)} className={classes.button}>商品詳細へ</button>
                                {
                                    user === null ? 
                                    true : <button onClick={ ()=> likeAdd(curry) } className={classes.button}>お気に入り</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            })
        )
    } else {
        return (
            newCurry.map((curry) => {
                return <div>
                    <div key={curry.id} className={classes.card}>
                        <div className={classes['card-title']}>{curry.name}</div>
                        <div><img src={curry.pic} alt='' onClick={() => handleLink(`currydetail/${curry.id}`)} className={classes['card-picutre']} /></div>
                        <div className={classes['card-content']}>
                            <div>Mサイズ:{curry.msizePrice}円</div>
                            <div>Lサイズ:{curry.lsizePrice}円</div>
                            <button onClick={() => handleLink(`currydetail/${curry.id}`)} className={classes.button}>商品詳細へ</button>
                            {
                                user === null ? 
                                true : <button onClick={ ()=> likeAdd(curry) } className={classes.button}>お気に入り</button>
                            }
                        </div>
                    </div>
                </div>
            })
        )
    }
}
    return (
        <div className={classes.search}>
            <h1>商品検索</h1>

            <button　className={classes.randombutton}　 onClick={ ()=>{randomCurry()}}　>迷っているあなたへ</button>
            <h2>{randomcurry}</h2>
            <h2><img src={randompic} alt=''/></h2>

            <input type='text' value={word} onChange={handleName} placeholder='商品名を入力' className={classes.text}/>
            <button className={classes.button} onClick={serchCurry} >検索</button>
            <button　className={classes.clearButton}　onClick={clear}>クリア</button>
            <h2>商品一覧</h2>
            <button className={classes.button} onClick={() => { High() }} >高い順</button>  <button className={classes.button} onClick={() => { Low() }}>低い順</button>
            <div className={classes['card-list']}>{ChangeCurry()}</div>
        </div>
    )
}
