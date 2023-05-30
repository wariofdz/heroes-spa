// Usa el AuthContext para que provea toda la información a toda la aplicación.

import { useReducer } from 'react';
import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';
import { types } from '../types/types';

// Creamos un estado inicial, pero que podriamos referenciarlo al LocalStorage o a una llamada Api.
// Una vez implementada la funcion de inicializacion init, ya no nos hace falta esta inicialización.
/*const initialState = {
    logged: false,
}*/

// Implementaremos la funcion de inicialización del Reducer, para inicializar el estado.
const init = () => {

  const user = JSON.parse(localStorage.getItem('user')); // asi no lo introduce como un string

  return {
    logged: !!user, // Doble negación. Si no existe lo pondrá en false
    user,
  }
}

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children}) => {

    const [authState, dispatch] = useReducer(authReducer, {} /*initialState*/, init);

    //Creamos una funcion para realizar el login y que espera un name como parametro de entrada
    const login = (name = '') => {

      const user = {
        id: 'abc',
        name: name
      };

      const action = {
          type: types.login, 
          payload: user /*{
            id: 'abc',
            name: name
          }*/
      }
      
      // Grabamos el valor del usuario con el que nos hemos "conectado"
      localStorage.setItem('user', JSON.stringify(user));

      dispatch(action);
    }

    const logout = () => {
      
      localStorage.removeItem('user');
      
      const action = {
        type: types.logout,
      };

      dispatch(action);
    }

  return (
    <AuthContext.Provider value={{ 
      //authState,
      ...authState, // si lo desestructuramos y tenemos una propiedad igual a una propiedad que tengamos después, puede sobreescribirse.
      login: login,
      logout: logout
    }}>
        {children}
    </AuthContext.Provider>
  );
}
