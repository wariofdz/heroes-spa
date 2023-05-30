import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const LoginPage = () => {

    // Para poder el dispatch de esta accion, hay que acceder al contexto (AuthContext)
    const {login} = useContext(AuthContext);
    
    const navigate = useNavigate();

    const onLogin = () => {
      
      // Creamos una propiedad con la información almacenada en la variable lastPath.
      const lastPath = localStorage.getItem('lastPath') || '/';

      // Estamos tomando el login del AuthContext y el login establece el usuario Mariote, que es el name que espera recibir. 
      login('Mario FP');

      // en navigate, le pasamos el valor de la variable, ya que exista o no siempre tendrá donde acceder
      navigate(lastPath, //'/',
      {
        replace: true
      });

    };

    return (
        <div className="container mt-5">
          <h1>Login</h1>
          <hr />

          <button
            className="btn btn-primary"
            onClick={onLogin}
          >
            Login
          </button>
        </div>
  
    )
      
  }
  