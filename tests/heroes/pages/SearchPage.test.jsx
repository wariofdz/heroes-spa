/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { SearchPage } from '../../../src/heroes/pages/SearchPage';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}) );

describe('Testing in <SearchPage />', () => { 

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    test('should show default values correctly', () => { 

        const {container} = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );
        
        // Creamos un snapshot para ver como luce el componente.
        expect(container).toMatchSnapshot();
        //screen.debug();

    });

    test('should show Batman and the input with the value of queryString', () => { 

        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );
        
        //screen.debug();
        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman');
        
        const image = screen.getByRole('img');
        expect(image.src).toContain('/heroes/dc-batman.jpg');

        const divSearch = screen.getByLabelText('searchAHero');
        expect(divSearch.style.display).toBe("none");

    });

    test('should show an error if not find the hero (batman123)', () => { 

        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        );
           
        //screen.debug();
        const texto = screen.getByLabelText('alert-danger');
        expect(texto.style.length).toBe(0);

    });

    test('should call the navigate a new screen', () => { 

        const inputValue = 'superman';
        const mockNavigate = jest.fn();
        
        // Al renderizarse más de una vez el componente, se cargará el elemento
        useNavigate.mockReturnValue(mockNavigate);

        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        );
        
        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {name: 'searchText', value: inputValue}});

        const form = screen.getByRole('form');
        fireEvent.submit(form);
        
        //screen.debug();
        expect(mockNavigate).toHaveBeenCalledWith(`?q=${inputValue}`);
    });

});