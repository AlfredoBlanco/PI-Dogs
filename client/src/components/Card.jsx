import React from "react";
import './Card.css';
import {Link} from 'react-router-dom';

export default function Card({id, img, name, weight, temp}){
    
    return(
        <div className="Card">
            <Link to={`/${id}`} className='link' >
            <h4>{name}</h4>
            <div>
            <img src={img} alt='Not found' id='image'/>
            </div>
            <span className="info">
            <p>{weight} kg</p>
            <span>{temp}</span>
            </span>
            </Link>
        </div>
        
    )
}