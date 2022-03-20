import {GET_ALL, GET_ONE, 
        CHARGE_TEMPS, EXISTENTES, 
        CREADOS,
        A_Z, Z_A, ASC, CREAR,
        LIMPIAR, DESC,
        FILTROS,
        TODOS,
        EDITAR,
        LIMPIAREDIT,
        ELIMINAR,
        LIMPIARELIMINAR,
    } from './types';
import axios from 'axios';


export function getAll(name){
    return async (dispatch) =>{
        let dogs = [];
        if(name) {
            dogs = await axios.get(`/dogs?name=${name}`);
        } else {
            dogs = await axios.get('/dogs');
        }
        return dispatch({
            type: GET_ALL,
            payload: dogs.data
        })
    }
}
export function getOne(id){

    return async (dispatch) =>{
        const dog = await axios.get(`/dogs/${id}`).then(r => r.data);
        
        return dispatch({
            type: GET_ONE,
            payload: dog
        })
    }
}

export function chargeTemps(){
    return async (dispatch) => {
        const temps = await axios.get('/temperament').then(r => r.data);
        return dispatch({
            type: CHARGE_TEMPS,
            payload: temps
        })
    }
}

export  function create(body){
    
    return async (dispatch) => {
        const res = await axios.post('/dog',{
            ...body
        })
        return dispatch({
            type: CREAR,
            payload: res.data
        })
    }
}

export function clear (){
    return {
        type: LIMPIAR,
    }
}


export function modify(filtrado, temperament, orden, dogs){
    let payload = dogs;
    if(filtrado !== TODOS){
        if(filtrado === EXISTENTES){
            payload = payload?.filter( e => e.id < 265);
        } else if( filtrado === CREADOS) {
            payload = payload?.filter( e => e.id >= 265);
        }
    }

    if(temperament !== TODOS ){
        payload = payload?.filter( e => e.temperament?.includes(temperament));
    }
    if(payload){

        switch(orden){
            case A_Z:
                payload.sort((a, b) => {
                    if(a.name < b.name) return -1;
                    if(a.name > b.name) return 1;
                    return 0
                })
            break;
            case Z_A:
                payload.sort((a, b) => {
                    if(a.name > b.name) return -1;
                    if(a.name < b.name) return 1;
                    return 0
                })
            break;
            case ASC:
                let ref = payload.map(e => {
                    let kg = e.weight.split(' - ');
                    return {weight: kg, name: e.name}
                });
                let pos = [];
                ref.forEach((e, i) => isNaN(e.weight[0])? pos.push(i): '');
                pos = pos.reverse().map(e => {
                    ref.splice(e, 1);
                    return payload[e];
                });
                ref.sort((a, b) => {
                    if(Number(a.weight[0]) < Number(b.weight[0])) return -1;
                    if(Number(a.weight[0]) > Number(b.weight[0])) return 1;
                    if(Number(a.weight[1]) < Number(b.weight[1])) return -1;
                    if(Number(a.weight[1]) > Number(b.weight[1])) return 1;
                    return 0
                })
                payload = ref.map(ele => payload.find(e => e.name === ele.name ));
                pos.forEach(e => payload.unshift(e));
            break;
            case DESC:
                let refe = payload.map(e => {
                    let kg = e.weight.split(' - ');
                    return {weight: kg, name: e.name}
                });
                let posi = [];
                refe.forEach((e, i) => !e.weight[1]? posi.push(i): '');
                posi = posi.reverse().map(e => {
                    refe.splice(e, 1);
                    return payload[e];
                });
                refe.sort((a, b) => {
                    if(Number(a.weight[1]) < Number(b.weight[1])) return 1;
                    if(Number(a.weight[1]) > Number(b.weight[1])) return -1;
                    if(Number(a.weight[0]) < Number(b.weight[0])) return 1;
                    if(Number(a.weight[0]) > Number(b.weight[0])) return -1;
                    return 0
                })
                payload = refe.map(ele => payload.find(e => e.name === ele.name ));
                posi.forEach(e => payload.push(e));
            break;
            default:
                break;
        }
    }
    return {
        type: FILTROS,
        payload
    };
}

export  function edit(id, body){

    
    return async (dispatch) => {
        let res = await axios.put(`/${id}`,{...body}).then(r => r.data);
        return dispatch({
            type: EDITAR,
            payload: res
        })
    }
}
export function clearEdit (){
    return {
        type: LIMPIAREDIT,
    }
}

export function deleteBreed(id){
    return async (dispatch) => {
        let res = await axios.delete(`/${id}`).then(r => r.data);
        return dispatch({
            type: ELIMINAR,
            payload: res
        })
    }
}
export function clearDelete(){
    return {
        type: LIMPIARELIMINAR,
    }
}