import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getHeroById } from '../helpers';
import { useMemo } from 'react';

export const HeroPage = () => {

    // El custom hook useParams nos permite recoger los parametros que nos llega por el URL.
    const {heroId} = useParams();
    //console.log(heroId);

    // Con el hook de react useMemo memorizamos el valor por si este no cambia, 
    // para que no se vuelva a redibujar todo el componente y hacer la app más liviana.
    const hero = useMemo( () => getHeroById(heroId), [heroId] );
    //console.log(hero);

    const navigateReturn = useNavigate();

    const onNavigateBack = () => {
        navigateReturn(-1); // Usamos el custom hook de react-router para navegar a la pagina anterior. 
    }

    // Si no existe un heroe, podemos forzar la salida a la pagina principal.
    // Antes de que renderice el componente o arrojase un error de no poder acceder a los valores del superHeroe.
    // Esto lo conseguiremos mediante el hook Navigate.
    if (!hero) {
      return <Navigate to="/marvel" />;
    }
    
    return (
      <div className="row mt-5">
        <div className="col-5 animate__animated animate__backInLeft">
          <img 
            className="img-thumbail " 
            src={`/heroes/${heroId}.jpg`} 
            alt={hero.superhero}  
          />
        </div>

        <div className="col-7 animate__animated animate__backInRight">

          <h3>{hero.superhero}</h3>
          <ul className="list-group list-group-flush">
              <li className="list-group-item"> <b>Alter ego:</b> {hero.alter_ego} </li>
              <li className="list-group-item"> <b>Publisher:</b> {hero.publisher} </li>
              <li className="list-group-item"> <b>First appearance:</b> {hero.first_appearance} </li>
          </ul>

          <h5 className="mt-3"> Characters </h5>
          <p>{hero.characters.split(',').join(' - ')}</p>

          <button 
            className='btn btn-outline-primary'
            onClick={onNavigateBack}
          >
            Regresar
          </button>

        </div>

      </div>
    )
  }
  

  