import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { clearDelete, deleteBreed } from "../actions";
import './CardDetail.css';

export default function CardDetail({id,img, name, temp, height, weight, years}){
    let kg = weight.split(' - ');
    const [bye, setBye] = useState(false);
    const dispatch = useDispatch();
    const eliminado = useSelector( state => state.deleted);
    const history = useHistory();

    function handleDelete(){
        setBye(true)
    }

    function handleSelect(e){
        
        if(e === 'SI'){
            dispatch(deleteBreed(id));
        } else if(e === 'NO'){

            setBye(false)
        }
    }

    useEffect(() => {
        console.log(eliminado);
        if (eliminado.msg) {
            alert(eliminado.msg);
            history.push('/home');
        }

        return () => {
            dispatch(clearDelete());
        }
    }, [eliminado])
    return (
        <div className="detail" >
            
                
            {
                id>264 
                ?
                 bye?
                 <>
                    <span className="titles"><b>Seguro desea eliminar la raza?</b></span> <br/>
                    <button value='SI' onClick={(e) => handleSelect(e.target.value)}
                        className='options' id="yes">
                        Si</button>
                    <button value='NO' onClick={(e) => handleSelect(e.target.value)}
                        className='options' id="no">
                        No</button>
                 </>
                :<div>
                    <button onClick={() => handleDelete()} className='options first'>Eliminar</button>
                    <Link to={`/edit/${id}`}>
                        <button className="options first">Editar</button>
                    </Link> 
                </div> : ''
            }

            <div className="infoDetail">

            <h1 className="titles">{name}</h1>
            <img src = {img} alt='Not found' className="detailphoto"/> <br />
            <span><b>Altura: </b></span>
            <span>{height} cm</span> <br/>
            <span><b>Peso: </b></span>
            {
                !isNaN( kg[0] )
                ? (<span>{weight} kg</span>) : kg[1]
                ? (<span>{`NE - ${kg[1]}`} kg</span>) : (<span>{'No especificado'}</span>)
            }<br/>
            
            <span><b>Temperamentos: </b></span>
            <span>{temp}</span> <br/>
            <span><b>Esperanza de vida: </b></span>
            <span>{years}</span>
            </div>
            

        </div>
    )
}