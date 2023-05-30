import { types } from '../types/types';

export const authReducer = ( state = {}, action) => {

    // No se debe utilizar llamadas externas a LocalStorage desde nuestro Reducer

    switch (action.type) {

      case types.login: 
          return {
              logged: true,
              user: action.payload
          };

      case types.logout: 
          return {
              logged: false,  // No hace falta la propiedad user, o podemos pasar user: null.
          };

      default: 
          return state;
    }
  
}
