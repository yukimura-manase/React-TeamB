// Stateを管理するStore => Actionsを受け取ったStateの変更処理をする部門を内部に持っている。
// StateとStateの更新処理 => ファイル単位のuseStateのようなもの。

// const StoreState=()=>{
//   return 100
// }



// export default StoreState;

export const initialState = {
  curryList:[
    {name:'カレー',detail:'カレーです',pic:'/pic/1.jpg',msizePrice:500,lsizePrice:700},
  ]

}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState,action) => {
  switch(action.type){
    default: 
    return state
  }
} 