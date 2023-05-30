import { useMemo } from 'react';
import { getHeroesByPublisher } from '../helpers';
import { HeroCard } from './';

export const HeroList = (pub) => {
  
    const heroes = useMemo( () => getHeroesByPublisher(pub.publisher), [pub.publisher]);
  
  return (
    <div className="row rows-cols-1 row-cols-md-3 g-3">
        { 
          heroes.map( (heroe) => (
                <HeroCard 
                    key={heroe.id}
                    hero={heroe}
                />

                //<li key={heroe.id}>
                //   <span>{heroe.superhero}</span> 
                //</li>
            ))
        }
    </div>
  )
}
