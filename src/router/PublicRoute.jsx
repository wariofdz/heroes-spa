import { useContext } from 'react';
import { AuthContext } from '../auth';
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export const PublicRoute = ({children}) => {

    //const {authState} = useContext(AuthContext);
    const {logged} = useContext(AuthContext);

  return (logged)
        ? <Navigate to="/" /> 
        : children
}
