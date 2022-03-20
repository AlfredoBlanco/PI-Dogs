import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { clearEdit, edit } from "../actions";


export function validate(data){
    let err = {};

    if(!data.name){
        err.name = 'El nombre es requerido'

    } else if(/[^a-z\s]/i.test(data.name)){
        err.name = 'El nombre no puede tener caracteres especiales'
    }
    if( !data.height_min || !data.height_max){
        err.height = 'El rango de altura es requerido'
        
    } else if(Number(data.height_max) <= Number(data.height_min)){
        err.height = 'La altura maxima tiene que ser mayor'
    }
    if( !data.weight_min || !data.weight_max){
        err.weight = 'El rango de peso es requerido'
        
    } else if(Number(data.weight_max) <= Number(data.weight_min)){
        err.weight = 'El peso maximo tiene que ser mayor'
    }
    if( !data.life_min || !data.life_max){
        err.life = 'El rango de esperanza de vida es requerido'
        
    } else if(Number(data.life_max) <= Number(data.life_min)){
        err.life = 'La esperanza de vida maxima tiene que ser mayor'
    }
    if(!data.url){
        err.url = 'El url es requerido'
    } else if(!/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?/.test(data.url)){
        err.url = 'La url no es valida'
    }
    return err;
}


export default function Edit(props){
    let {id} = props.match.params; 
    const dogo = useSelector(state => state.dog)
    const temps = useSelector(state => state.temperament);
    const editado = useSelector(state => state.updated);
    const dispatch = useDispatch();
    const history = useHistory();
    let [weight_min, weight_max] = dogo.weight.split(' - ');
    let [height_min, height_max] = dogo.height.split(' - ');
    let [life_min, lifemax] = dogo.life_span.split(' - ');
    let [life_max,] = lifemax.split(' ');
    let tempers = dogo.temperament.split(', ');
    const [info, setInfo] = useState({name: dogo.name, weight_min, 
        weight_max, height_min, height_max,
        life_min, life_max, url : dogo.url, temperamentos : tempers
    });
    const [err, setErr] = useState({
        disabled: true
    });
    const [send, setSend] = useState('');

    function handleChange(e){
        if (e.name === 'temperamentos'){
            if( e.value !== 'nada' && !info.temperamentos.includes(e.value)){
                
                setInfo({
                    ...info,
                    [e.name]: [...info.temperamentos, e.value]
                });
                setErr(validate({
                    ...info,
                    [e.name]: [...info.temperamentos, e.value]
                }))
                
            }
        }else{

            setInfo({
                ...info,
                [e.name] : e.value
            });
            setErr(validate({
                ...info,
                [e.name]: e.value
            }))
        }
        
    }
    function handleDelete(e){
        e = e.split(' ')[0];
        let newTemps = info.temperamentos.filter(ele => ele !== e);
        setInfo({
            ...info,
            temperamentos: newTemps
        })
    }
    function handleSubmit(){
        
        let height = `${info.height_min} - ${info.height_max}`;
        let weight = `${info.weight_min} - ${info.weight_max}`;
        let years = `${info.life_min} - ${info.life_max} years`;
        setSend({
            name : info.name,
            height, 
            weight, 
            years, 
            image: info.url, 
            temperament : info.temperamentos
        })
        setInfo({
            name:'',
            height_min: '',
            height_max: '',
            weight_min: '',
            weight_max: '',
            life_min: '',
            life_max: '',
            url: '',
            temperamentos: []
    
        })
        setErr({ disabled: true});
    }
    function handleBack(){
        history.goBack();
    }

    useEffect(() => {
        if(send) dispatch(edit(id, send))
        return () => {
            dispatch(clearEdit())
        }
    }, [send, id, dispatch])
    useEffect(() =>{
        if(editado.msg) {
            alert(editado.msg);
            history.push(`/${id}`);
        }

    },[editado, history, id])
    
    return (
        <div className="all">
        <div className="container">
            <button onClick={handleBack}>Volver</button>
            <h2>Formulario de actualización de raza</h2>
            <form onSubmit={ e =>{
                e.preventDefault();
                handleSubmit();
            }}>
                
                <div className="input">
                <label><b>Nombre: </b></label>
                <input type='text' placeholder="Nombre de la raza" 
                    name = 'name'  onChange={(e) => handleChange(e.target)}
                    value={info.name} /> <br/>
                    <span className="error">
                        {err.name? err.name : ''}
                    </span>
                    
                </div>
                <div className="input">
                <label><b>Altura: </b></label> <br/>
                
                <input type='number' placeholder="Altura minima" min='1'
                    name="height_min"  onChange={(e) => handleChange(e.target)}
                    value={info.height_min} />
                <span><b> - </b> </span>
                <input type='number' placeholder="Altura maxima"
                    name="height_max" min='1'  onChange={(e) => handleChange(e.target)}
                    value={info.height_max} /> <br/>
                <span  className="error">
                    {err.height? err.height : ''}
                </span>
                </div>
                <div className="input">
                <label><b>Peso: </b></label><br/>
                <input type='number' placeholder="Peso minimo"
                    name="weight_min" min='1'  onChange={(e) => handleChange(e.target)}
                    value={info.weight_min} />
                <span><b> - </b></span>
                <input type='number' placeholder="Peso maximo"
                    name="weight_max" min='1'  onChange={(e) => handleChange(e.target)}
                    value={info.weight_max} /> <br/>
                    <span className="error">
                        {err.weight? err.weight : ''}
                    </span>
                </div>
                <div className="input">
                <label><b>Esperanza de vida: </b></label><br/>
                <input type='number' placeholder="Año minimo"
                    name="life_min" min='1'  onChange={(e) => handleChange(e.target)}
                    value={info.life_min} />
                <span><b> - </b></span>
                <input type='number' placeholder="Año maximo"
                    name="life_max" min='1'  onChange={(e) => handleChange(e.target)}
                    value={info.life_max} /> <br/>
                    <span className="error">
                        {err.life? err.life : ''}
                    </span>
                
                    
                </div>
                <div className="input">
                <label><b>Imagen: </b></label><br/>
                <input type='text' placeholder="Url de la imagen" name="url"
                    onChange={(e) => handleChange(e.target)}
                    value={info.url}/> <br/>
                    
                    <span className="error">
                        {err.url? err.url : ''}
                    </span>
                </div>
                <div className="input">
                <label><b>Temperamentos: </b></label><br/>
                <select name='temperamentos' onChange={(e) => handleChange(e.target)}>
                    <option name='temperamentos' value='nada'>Temperamentos</option>
                    {
                        temps?.map( e => {
                            return <option value={e} key={e}>{e}</option>
                        })
                    } 
                </select> <br/>
                
                </div>
                
                <button type="submit" 
                    className='submit'
                    disabled={Object.keys(err).length? true : false}>
                    Actualizar raza
                </button>

            </form>
            <div>
                <span>
                    {info.temperamentos? info.temperamentos.map(e =>{
                        return <button className="submit" key={e} 
                            onClick={() => handleDelete(e)}> {e} ❌ </button>
                    } ) : ''}
                </span>
            </div>
        </div>
            
        </div>
    )
        
}