/* eslint-disable no-undef */

import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { PublicRoute } from '../../src/router/PublicRoute';
import { AuthContext } from '../../src/auth';

describe('Testint in <PublicRoute />', () => { 
   
    test('should to show children if not authenticate', () => { 
        
        // Creamos una variable que contenga el logged = false para que nos deje acceder a su elemento hijo.
        const contextValue = {
            logged: false
        };

        // Esto no funcionará porque no estamos proveyendo el contexto, para ello necesitamos lo siguiente:
        //render(<PublicRoute />);
        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoute>
                    <h1>Esto es una ruta publica</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );

        //screen.debug();
        expect(screen.getByText('Esto es una ruta publica')).toBeTruthy();

    });

    test('should navigate if authenticate', () => { 
    
        // Para este caso, deberemos probar que si estamos autenticados llegamos a la pagina de marvel. 
        // No es cometido de esta parte, probar que se mostraría en esa pagina, sino que lleguemos hasta ella. 
        const contextValue = {
            logged: true,
            user: {
                id: 'abc',
                name: 'Pepito'
              }
        };

        // El error que sale es que tenemos que configurar un Router para poder utilizar el Navigate.

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>  {/* Cuidado con esto, que provoca un bucle infinito, al no tener definida otra ruta. */}
                    <Routes>
                        <Route path='login' element={
                            <PublicRoute>
                                <h1>Esto es una ruta publica</h1>
                            </PublicRoute>
                        } />
                        <Route path='' element={<h1>Ruta Marvel</h1>} />
                    </Routes>
                </MemoryRouter>                
            </AuthContext.Provider>
        );

        //screen.debug();
        expect(screen.getByText('Ruta Marvel')).toBeTruthy();

    });


});