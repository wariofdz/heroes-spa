/* eslint-disable no-undef */
import { fireEvent, render, screen } from '@testing-library/react';
import { AuthContext } from '../../../src/auth/context/AuthContext';
// eslint-disable-next-line no-unused-vars
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { Navbar } from '../../../src/ui/components/Navbar';


const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate,
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
        expect(mockUseNavigate).toHaveBeenCalledWith('/login', {"replace": true});
        
    }); 

});