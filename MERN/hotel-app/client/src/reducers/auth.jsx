//function takes 2 inputs state({} means default values) and action(is a object and will have some properties like payload)
// { type: 'LOGGED_IN_USER' , payload: { name: 'Uzi' , role: 'Seller' } }

let userState ;

if( window.localStorage.getItem('auth') ){
  userState = JSON.parse(window.localStorage.getItem('auth'))
}else{
  userState = null
}


export const authReducer = ( state = userState , action) => {
    switch( action.type ) {
      case 'LOGGED_IN_USER':
        return { ...state, ...action.payload };
      case 'LOGOUT':
        return action.payload
      default:
        return state; 
  
    }
  }   