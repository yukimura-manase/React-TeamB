// Stateを管理するStore => Actionsを受け取ったStateの変更処理をする部門を内部に持っている。
// StateとStateの更新処理 => ファイル単位のuseStateのようなもの。

// const StoreState=()=>{
//   return 100
// }

// export default StoreState;

export const initialState ={
  Curry:[{id:1,img:'カレーの画像',name:'餃子定食',lsizePrice:500,msizePrice:1000},
  {id:2,img:'カレーうどんの画像',name:'チャーハン',lsizePrice:600,msizePrice:1200},
  {id:3,img:'カレーそばの画像',name:'青椒肉絲',lsizePrice:300,msizePrice:1000},]
}

// eslint-disable-next-line import/no-anonymous-default-export
export default(state=initialState,action) =>{
  switch(action.type){
    default:
      return state
  }
}