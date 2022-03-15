import React from "react";
import './Card.css';
import {Link} from 'react-router-dom';

export default function Card({id, img, name, weight, temp}){
    let kg = weight.split(' - ');
    return(
        <div className="Card">
            <Link to={`/${id}`} className='link' >
            <h4>{name}</h4>
            <div>
            <img src={img} alt='Not found' id='image'/>
            </div>
            <span className="info">
            {
                
                !isNaN( kg[0] )
                ? (<p>{weight} kg</p>) : kg[1]
                    ? (<p>{`NE - ${kg[1]}`} kg</p>) : (<p>{'No especificado'}</p>)
            }
            
            <span>{temp}</span>
            </span>
            </Link>
        </div>
        
    )
}