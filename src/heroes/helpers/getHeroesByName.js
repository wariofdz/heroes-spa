import { heroes } from "../data/heroes";

export const getHeroesByName = (name = '') => {

    // Limpiamos el parametro recibido
    name = name.toLowerCase().trim();

    if (name.length === 0) return [];

    return heroes.filter(
        hero => hero.superhero.toLowerCase().includes(name)
    );
    

}
