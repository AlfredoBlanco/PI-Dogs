import { GET_ALL, GET_ONE, 
        CHARGE_TEMPS,
        CREAR, LIMPIAR, FILTROS } from "../actions/types";


let initial = {
    dogs: [],
    dog: {},
    temperament: [],
    created: {}
}

export default function reducer(state = initial,{type, payload}) {
    
    switch(type){
        case GET_ALL:
            return {
                ...state,
                dogs: payload
            };
        case GET_ONE:
            return {
                ...state,
                dog: payload
            };
        case CHARGE_TEMPS:
            return {
                ...state,
                temperament: payload
            };
        
        case CREAR:
            return {
                ...state,
                created: payload
            };
        case LIMPIAR:
            return {
                ...state,
                created: {}
            }
        case FILTROS: 
            return {
                ...state,
                dogs: payload
            }
        default:
            return state;

    }
};