import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

import { HeroCard } from '../components';
import { useForm } from '../hooks/useForm';
import { getHeroesByName } from '../helpers';

export const SearchPage = () => {

  const navigate = useNavigate();
  const location = useLocation(); // Obtenedremos el parametro del query parameter.

  // Nos instalamos un paquete que se llama query-string que nos servirá para poder tratar los parametros recibidos por el query parameter.
  // Nos troceará el string recibido del query. Son opcionales y siempre string (aunque haya numeros).
  const { q = '' } = queryString.parse(location.search);

  const heroes = getHeroesByName(q);

  // Creamos dos propiedades nuevas que nos evaluan si las condiciones se cumplen
  const showSearch = (q.length === 0);
  const showError = (q.length > 0) && heroes.length === 0;

  const {searchText, onInputChange} = useForm({
    searchText: q
  });
  
  const onSearchSubmit = (event) => {
    event.preventDefault();
    //if (searchText.length <= 1) return; // Si tiene menos de 2 caracteres no hace nada
    
    navigate(`?q=${searchText}`);
  };

  return (
    <>
        <h1 className="mt-2">Search</h1>
        <hr />

        <div className="row">
          <div className="col-5">
            <h4>Searching</h4>
            <hr />
            <form onSubmit={onSearchSubmit} aria-label="form">
              <input type="text" 
                    placeholder="Search a hero"
                    className="form-control"
                    name="searchText"
                    autoComplete="off"
                    value={searchText}
                    onChange={onInputChange}
              />

              <button className="btn btn-outline-primary mt-3">
                Search
              </button>

            </form>

          </div>

          <div className="col-7">
            <h4>Results</h4>
            <hr />

            {/*
              // Opción 1 para habilitar o deshabilitar los mensajes en el navegador: Search a hero OR No exists xxxx
              // Mediante la utilización de un ternario

              (q === '') 
                ? <div className="alert alert-primary">Search a hero</div>
                : (heroes.length === 0) && <div className="alert alert-danger">No exists <b>{q}</b>!</div>
            */
            }

            { /* Opción 2: utilizar el style del elemento para mediante ternario mostrar o no el elemento */}
            
            <div className="alert alert-primary animate__animated animate__fadeIn" 
                 style={{display: showSearch ? '' : 'none'}}
                 aria-label="searchAHero">
              Search a hero
            </div>

            <div aria-label="alert-danger"
                 className="alert alert-danger animate__animated animate__fadeIn" 
                 style={{display: showError ? '' : 'none'}}>
              No exists <b>{q}</b>!
            </div>

            { 
              // No se renderiza nada si lo que nos devuelve es un array vacio
              heroes.map( hero => (
                <HeroCard key={hero.id} hero={hero}/> 
              ))
            }

          </div>

        </div>

    </>
  )
}
