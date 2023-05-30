/* eslint-disable no-undef */
import { authReducer, types } from "../../../src/auth";

describe('Testing in authReducer.js', () => { 
    
    const initialState = {
        logged: false,
        user: null
    };

    test('should to return a default state', () => { 
    
        const newState = authReducer(initialState, {});
        expect(newState).toBe(initialState);

    });

    test('should to call login, authentication and established user', () => { 
    
        const action = {
            type: types.login,
            payload: {
                id: 'abc',
                name: 'Mariote'
              }
        };

        const newState = authReducer(initialState, action);
        //console.log(newState.user);
        expect(newState.logged).toBeTruthy();
        expect(newState.user).toBe(action.payload);
        // Tambien podemos hacer la siguiente comprobacion
        expect(newState).toEqual({
            logged: true,
            user: {
                id: 'abc',
                name: 'Mariote'
              }
        })
    });

    test('should to call logout, delete name and logged to false', () => { 

        const state = {
            logged: true,
            user: {
                id: 'abc',
                name: 'Mariote'
              }
        };
        
        const action = {
            type: types.logout
        };

        const newState = authReducer(state, action);
        //console.log(newState);
        expect(newState).toEqual({logged: false});

    });

});