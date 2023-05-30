import { useContext } from 'react';
import { AuthContext } from '../auth';
import { Navigate, useLocation } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export const PrivateRoute = ({children}) => {

    // Dependiendo si estoy autenticado o no voy a mostrar todas las rutas y sus subrutas.
    //const {authState} = useContext(AuthContext);
    const {logged} = useContext(AuthContext);

    // Vamos a memorizar en el localStorage el valor del path en el que nos encontramos. Para ello usaremos useLocation().
    const {pathname, search} = useLocation();
    const lastPath = pathname + search;

    localStorage.setItem('lastPath', lastPath);

  // Si el valor de logged es true, nos muestra todas las rutas hijas (a partir del HeroesRoutes), sino nos redirige a login.  
  // Tambien podriamos mostrar un mensaje de error.
  return (logged)
        ? children
        : <Navigate to="/login" /> 
}
