import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/context/AuthContext';

export const Navbar = () => {

    const {user, logout} = useContext(AuthContext);
    
    // useNavigate es un custom hook que hicieron los de react-router-dom para ayudarnos a navegar entre paginas
    const navigate = useNavigate();

    const onLogout = () => {

        logout();
        //console.log('Logout');
        navigate('/login', {     // El primer parametro se trata de la pagina a la cual nos queremos dirigir.
            replace: true,       // El replace pasado en el objeto evita que la persona pueda regresar atrás en el historial de la web.
            //state: any
        });
    };

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">
            
            <Link 
                className="navbar-brand" 
                to="/"
            >
                Franquicias
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink 
                        className={ (args) => `nav-item nav-link ${args.isActive ? 'active' : '' }`}
                        to="/marvel"
                    >
                        Marvel
                    </NavLink>

                    <NavLink 
                        className={ (args) => `nav-item nav-link ${args.isActive ? 'active' : '' }`}
                        to="/dc"
                    >
                        DC
                    </NavLink>

                    <NavLink 
                        className={ (args) => `nav-item nav-link ${args.isActive ? 'active' : '' }`}
                        to="/search"
                    >
                        Search
                    </NavLink>

{/*                    <NavLink 
                        className={ (args) => `nav-item nav-link ${args.isActive ? 'active' : '' }`}
                        to="/hero"
                    >
                        Hero
                    </NavLink> */}
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">
                    
                    <span aria-label="username" className="nav-item nav-link text-primary">
                        {user?.name}
                    </span>

                    <button
                        className='nav-item nav-link btn'
                        onClick={onLogout}
                    >
                        Logout
                    </button>

                </ul>
            </div>
        </nav>
    )
}