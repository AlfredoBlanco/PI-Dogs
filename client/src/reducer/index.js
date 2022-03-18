import { GET_ALL, GET_ONE, 
        CHARGE_TEMPS,
        CREAR, LIMPIAR, FILTROS, EDITAR, 
        LIMPIAREDIT, ELIMINAR, LIMPIARELIMINAR } from "../actions/types";


let initial = {
    dogs: [],
    dog: {},
    temperament: [],
    created: {},
    updated: {},
    deleted: {}
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
        case EDITAR:
            return{
                ...state,
                updated: payload
            };
        case ELIMINAR:
            return {
                ...state,
                deleted: payload
            };
        case LIMPIAR:
            return {
                ...state,
                created: {}
            };        
        case LIMPIAREDIT:
            return {
                ...state,
                updated: {}
            };
        case LIMPIARELIMINAR:
            return {
                ...state,
                deleted: {}
            };    
        case FILTROS: 
            return {
                ...state,
                dogs: payload
            };
        default:
            return state;

    }
};