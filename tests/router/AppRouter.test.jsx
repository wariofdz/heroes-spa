/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { render, screen } from "@testing-library/react"
import { AuthContext } from "../../src/auth"
import { MemoryRouter } from "react-router-dom";
import { AppRouter } from "../../src/router/AppRouter";


describe('Testing in <AppRouter />', () => { 
    
    test('should show the login if not authenticate', () => { 
        
        const contextValue = {
            logged: false
        };

        // El MemoryRouter podemos ponerlo tanto dentro como fuera del AuthContext. Lo importante es que exista.
        // La ruta dentro del MemoryRouter será a cualquier pagina menos a Login, ya que queremos probar precisamente el acceso si no está autenticado.
        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        //screen.debug();

        // Esperamos encontrar la palabra Login en el codigo. Si hacemos un screen.debug() veremos que aparece en dos puntos (un h1 y un boton).
        // Para poder verificar que la prueba pasa, podemos hacerlo de la siguiente manera:
        expect(screen.getAllByText('Login').length).toBe(2);

    });

    test('should show the marvel component if authenticate', () => { 
        
        const contextValue = {
            logged: true,
            user: {
                id: 'abc',
                name: 'Pedro'
            }
        };

        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        //screen.debug();

        // Esperamos encontrar la palabra Login en el codigo. Si hacemos un screen.debug() veremos que aparece en dos puntos (un h1 y un boton).
        // Para poder verificar que la prueba pasa, podemos hacerlo de la siguiente manera:
        expect(screen.getByText('Marvel Comics')).toBeTruthy();
    });

});