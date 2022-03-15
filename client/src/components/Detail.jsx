import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch} from 'react-redux';
import { Link } from "react-router-dom";
import { getOne } from "../actions";
import CardDetail from './CardDetail'
import './Detail.css';


export default function Detail(props){
    const {id} = props.match.params;
    const dispatch = useDispatch();
    const dogo = useSelector(state => state.dog);
    const [perro, setPerro] = useState(false);


    useEffect( ()=>{
        dispatch(getOne(id)).then(() => setPerro(true));
        
        return async() =>{
            setPerro(false)
        }
    },[dispatch, id]);

    return(
        <div className="content">
            
            {
                
                Object.keys(dogo).length && perro?
                <div className="detailInfo">

                    <CardDetail 
                        img={dogo.url}
                        name = {dogo.name}
                        temp = {dogo.temperament}
                        height = {dogo.height}
                        weight = {dogo.weight}
                        years = {dogo.life_span} 
                        />
                    <Link to='/home'>
                        <button id="out">Listo!</button>
                    </Link>
                </div>
                :
                <h1>Cargando ... </h1>
                
                
            }
           
          
        </div>
    )
}