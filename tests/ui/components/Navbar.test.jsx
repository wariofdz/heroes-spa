/* eslint-disable no-undef */
import { fireEvent, render, screen } from '@testing-library/react';
import { AuthContext } from '../../../src/auth/context/AuthContext';
// eslint-disable-next-line no-unused-vars
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { Navbar } from '../../../src/ui/components/Navbar';


/*
Para poder evaluar el useNavigate de la libreria de react router dom, tenemos que elaborar un mock de esta funcion. 
El problema es que todas aquellas funciones que necesitemos de la libreria también habria que implementarlas como mock.
Para evitar tener que realizar un mock de cada una, podemos utilizar lo siguiente:
*/
// const mockUseNavigate = useNavigate;

jest.mock('react-router-dom', () => ({
    // Para asegurarnos de que no tenemos problemas con el resto de elementos de la libreria de react router dom, podemos esparcir
    // todos los elementos de la misma mediante jest.requireActual('react-router-dom') y sobreescribir los elementos necesarios justo debajo de esta instruccion 
    ...jest.requireActual('react-router-dom'),
    // Podemos sobreescribir el funcionamiento de cada elemento de la libreria para que realice el comportamiento que nosotros esperamos.
    // De esta manera, podemos mockear el comportamiento del useNavigate:
    useNavigate: jest.fn(),
}) );

describe('Testing in <Navbar />', () => { 

    const contextValue = {
        logged: true,
        user: {
            id: 'abc',
            name: 'Fernanda'
        },
        logout: jest.fn()
    };

    //const onLogout = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should show the user\'s name when is authenticate', () => { 

        render(
            <MemoryRouter>
                <AuthContext.Provider value={contextValue}>
                    <Navbar />
                </AuthContext.Provider>            
            </MemoryRouter>
        );

        //screen.debug();
        expect(screen.getByText('Fernanda')).toBeTruthy();

    });

    test('should call logout and navigate when click in the button', () => { 

        const navigateMock = jest.fn();
        
        useNavigate.mockReturnValueOnce(navigateMock);

        render(
            <MemoryRouter>
                <AuthContext.Provider value={contextValue}>
                    <Navbar />
                </AuthContext.Provider>            
            </MemoryRouter>
        );

        //screen.debug();

        const buttonLogout = screen.getByRole('button');
        //console.log(buttonLogout);
        fireEvent.click(buttonLogout);
        
        // Evaluamos que ha sido llamado desde nuestro contextValue la funcion de logout.
        expect(contextValue.logout).toHaveBeenCalled();
        expect(navigateMock).toHaveBeenCalledWith('/login', {"replace": true});
        
    }); 

});