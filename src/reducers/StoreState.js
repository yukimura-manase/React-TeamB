// Stateを管理するStore => Actionsを受け取ったStateの変更処理をする部門を内部に持っている。
// StateとStateの更新処理 => ファイル単位のuseStateのようなもの。


import {REMOVECART} from '../actions/ActionCreator'

export const initialState = { // オブジェクトの形で設定。
    cartlist:[ 
        {id:1,itemName:'ロボ玉試作1号機',size:'M',num:1,topping:'ラーメン',price:2000},
        {id:2,itemName:'ロボ玉試作2号機',size:'S',num:5,topping:'ひまわり',price:3000},
        {id:3,itemName:'ロボ玉試作3号機',size:'L',num:8,topping:'ひまわり',price:5000},
    ]
}


// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState,action)=>{ // 1.Storeのstate & 2.dispatchで送られてきたActionsの情報を引数に取って、処理をする関数

    switch(action.type){

        case REMOVECART:{
            const copyTodoList2 = state.cartlist.concat() // コピー
            copyTodoList2.splice(action.index,1)

            return {
                cartlist:copyTodoList2
            }
        }
        default:
            return state
    }

}



// import {ADDTODO,REMOVETODO} from '../actions/ActionCreator'

// export const initialState = { // オブジェクトの形で設定。
//     cartList:[ 
//         {id:1,name:'カツカレー'},
//         {id:2,name:'ポークポークカレー'},
//         {id:3,name:'牛すじカレー'},
//     ]
// }

// // eslint-disable-next-line import/no-anonymous-default-export
// export default (state = initialState,action)=>{ // 1.Storeのstate & 2.dispatchで送られてきたActionsの情報を引数に取って、処理をする関数

//     switch(action.type){
//         case ADDTODO:{ 
//             const newTodo = {todo:action.inputtodo}
//             const copyTodoList = state.todolist.slice() // コピー
//             copyTodoList.push(newTodo) 
//             // ここまででcaseごとの加工処理。

//             return { // 加工したものをオブジェクトの形でセットしてStateに返す。
//                 todolist:copyTodoList
//             }
//         }
//         case REMOVETODO:{
//             const copyTodoList2 = state.todolist.concat() // コピー
//             copyTodoList2.splice(action.index,1)

//             return {
//                 todolist:copyTodoList2
//             }
//         }
//         default:
//             return state
//     }

// }




// const StoreState=()=>{
//   return 100
// }

// export default StoreState;