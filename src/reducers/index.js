import {combineReducers} from 'redux'
import StoreState from './StoreState'; // 仮置き

export default combineReducers({StoreState}); // ファイルの結合

// import { compose, createStore, applyMiddleware } from 'redux';
// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//     //   case 'ADD_TITLE':            
//     //     return { ...state,
//     //               title: action.payload.title,
//     //               makeDate: new Date()
//     //     };
//     //   case 'ADD_HUMAN':
//     //     return { ...state,
//     //               humans: [...state.humans, action.payload]
//     //     };
//     //   case 'ADD_HUMAN_TOTAL':         
//     //     return {  ...state,
//     //               humans: state.humans.map( h => h.id === action.payload.id ? 
//     //                   { ...h, total:[ ...h.total, action.payload.total ] } : h ) }      
//     //   case 'DELETE_HUMAN' :
//     //     return { ...state,
//     //               humans: state.humans.filter( h => !(h.id === action.payload.id) )}      
//     //   case 'DELETE_HUMAN_TOTAL' :
//     //     return { ...state, humans: state.humans.map( h => h.id === action.payload.id ? 
//     //       { ...h, total: h.total.filter( t => !(t.id === action.payload.total.id) ) ,
//     //               totalsum: h.total.reduce((a,c) =>  
//     //                 c.id === action.payload.total.id ? a * 1 : a * 1 + c.price * 1 
//     //                , 0 ) } : h ) }
//     //   case 'UPDATE_TITLE':            
//     //     return { ...state,
//     //               title: action.payload.title,                
//     //     }; 
//     //   case 'UPDATE_HUMAN_TOTAL' :
//     //     return { ...state, humans: state.humans.map( h => h.id === action.payload.id ? 
//     //       { ...h, total: h.total.map( t => t.id === action.payload.total.id ? action.payload.total : t ),
//     //               totalsum: h.total.reduce((a,c) =>  
//     //                 c.id === action.payload.total.id ? a * 1 + action.payload.total.price * 1 : a * 1 + c.price * 1
//     //                , 0 ), } : h ) }
//     //   case 'UPDATE_USER' :        
//     //     return {
//     //       ...state, 
//     //       login: action.payload.login,
//     //       user: action.payload.user
//     //     }
//     //   case 'UPDATE_HID' :
//     //     return {
//     //       ...state,
//     //       hid: action.payload.hid,  
//     //       makeDate: action.payload.makeDate      
//     //     }
//     //   case 'FETCH_ITEM' :
//     //     return { ...state,
//     //               humans: action.payload.humans,
//     //               title: action.payload.title,
//     //               makeDate: action.payload.makeDate,
//     //               hid: action.payload.hid
//     //     }  
//       default:
//         return state;
//     }
//   };
  
//   const initialState = {
//     Coffee:[],
//     Toppings:[],    
//     user: {},  // displayName
//     cart:{},
//     orderhistory:[]
//   }
  
// //   const enhancer = compose(persistState(['humans','login','title','user','uid'], { key: 'warikan' }),applyMiddleware(thunk));
  
//   const store = createStore(reducer,                                                    
//                             window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),                            
//                             );
  
//   export default store;