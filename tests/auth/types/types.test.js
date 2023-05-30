/* eslint-disable no-undef */

import { types } from "../../../src/auth";

describe('Testing in types.js', () => { 
    
    test('should to return the types', () => { 
        
        //console.log(types);
        expect(types).toEqual({
            login: '[Auth] Login',
            logout: '[Auth] Logout'
        });

    });


});