/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom';

/*export const HeroCard = ({id,
                        superhero,
                        publisher,
                        alter_ego,
                        first_appearance,
                        characters}) => {*/

const CharactersByHero = ({alter_ego, characters}) => {

    // regresa un componente vacio o si son diferentes, regresamos todos los caracteres
    if (alter_ego === characters) return (<></>);
    
    return (<p>{characters}</p>);

}

export const HeroCard = ({hero}) => {
    
    const heroImageUrl = `/heroes/${hero.id}.jpg`; 

  return (
    <div className="col animate__animated animate__bounceIn">
        <div className="card">
            
            <div className="row no-gutters">
                
                <div className="col-4">
                    <img src={heroImageUrl} className="card-img" alt={hero.superhero} />
                </div>

                <div className="col-8">

                    <div className="card-body">
                        <h5 className="card-tittle">{hero.superhero}</h5>
                        <p className="card-text">{hero.alter_ego}</p>

                        { // Podemos crear un nuevo componente dentro de este fichero para que realice esta evaluación
                        //    (hero.alter_ego !== hero.characters) && (<p>{hero.characters}</p>)
                        }
                       
                        <CharactersByHero alter_ego={hero.alter_ego} characters={hero.characters} />
                       

                        <p className="card-text">
                            <small className="text-mutted">{hero.first_appearance}</small>
                        </p>

                        <Link to={`/hero/${hero.id}`}>
                            Más...
                        </Link>

                    </div>

                </div>

            </div>


        </div>
    </div>
  )
}
