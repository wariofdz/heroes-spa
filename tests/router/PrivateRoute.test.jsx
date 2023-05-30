/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import { PrivateRoute } from "../../src/router/PrivateRoute";
import { AuthContext } from "../../src/auth";
import { MemoryRouter } from "react-router-dom";

describe('Testing in <PrivateRoute />', () => { 
    
    test('should to show children if not authenticate', () => { 
        
        // Creamos una variable que contenga el logged = false para que nos deje acceder a su elemento hijo.
        const contextValue = {
            logged: true
        };

        // Esto no funcionará porque no estamos proveyendo el contexto, para ello necesitamos lo siguiente:
        //render(<PublicRoute />);
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <PrivateRoute>
                        <h1>Esto es una ruta privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        //screen.debug();
        expect(screen.getByText('Esto es una ruta privada')).toBeTruthy();

    });

    test('should call to LocalStorage', () => { 
        
        // Con esta instruccion estamos sobreescribiendo la implementacion del prototype, necesario para poder realizar las pruebas.
        // No podemos utilizar el localStorage directamente.
        Storage.prototype.setItem = jest.fn();

        const contextValue = {
            logged: true
        };

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/search?q=batman']}>
                    <PrivateRoute>
                        <h1>Esto es una ruta privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );
    
        expect(localStorage.setItem).toHaveBeenCalled();
        // Simulamos una llamada con argumentos.
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath','/search?q=batman'); 

    });

});