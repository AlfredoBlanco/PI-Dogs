import React from "react";
import './CardDetail.css';

export default function CardDetail({img, name, temp, height, weight, years}){
    
    return (
        <div className="detail" >
            <h1>{name}</h1>
            <img src = {img} alt='Not found' className="detailphoto"/> <br />
            <span><b>Altura: </b></span>
            <span>{height} cm</span> <br/>
            <span><b>Peso: </b></span>
            <span>{weight} kg</span><br/>
            <span><b>Temperamentos: </b></span>
            <span>{temp}</span> <br/>
            <span><b>Esperanza de vida: </b></span>
            <span>{years}</span>

        </div>
    )
}