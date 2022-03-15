import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch} from 'react-redux';
import { getAll, chargeTemps, modify } from "../actions";
import Card from "./Card";
import Pagina from "./Pagina";
import { Link } from "react-router-dom";
import { A_Z, Z_A, ASC, DESC, EXISTENTES, CREADOS, TODOS } from "../actions/types";
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import './Home.css';

export default function Home(){
    const dispatch = useDispatch();
    const allDogs = useSelector(state => state.dogs, () => {return false});
    const temps = useSelector( state => state.temperament,);
    //Para guardar siempre la lista entera
    const [Dogos, setDogos] = useState('');
    const [filtrados, setFiltrados] = useState('todos');
    const [temp, setTemp] = useState('todos');
    const [order, setOrder] = useState('az');
    const [search , setSearch] = useState('');
    const [page, setPage] = useState(1);
    const cantPerros = 8;  
    const ultimo = page * cantPerros;
    const primero = ultimo - cantPerros;
    const amostrar = allDogs.length? allDogs.slice(primero, ultimo) : [];

    const cambioPag = (num) => {
      setPage(num);
    }
    function handleFilter(e) {
      
      setFiltrados(e.target.value);
    }
    function handleTemp(e){
      setTemp(e.target.value);
      
    }
    function handleOrder(e) {
      setOrder(e.target.value);

    }
    function handleSearch(e){
      setSearch(e);
      setPage(1);
    }

    useEffect(() => {
      dispatch(getAll(search));
    }, [search, dispatch]);

    useEffect(()=>{
      dispatch(getAll()).then(e => {setDogos(e.payload)});
      dispatch(chargeTemps());

    },[dispatch]);

    useEffect(() => {
      if(Dogos) dispatch(modify(filtrados, temp, order, Dogos))
      setPage(1);
    },[filtrados, temp, order, Dogos, dispatch]);
    return(
        <div>
          <div className="deco">
            <div id="henry">
              <a href="https://github.com/AlfredoBlanco" className="redirect">

                <AiFillGithub />
              </a>
              <a href="https://www.linkedin.com/in/alfredo-martin-blanco-6644aa221/" className="redirect">

                <AiFillLinkedin />
              </a>
              
            </div>
            <Link to = '/create'>
              <button className="select" id="create">Crear nueva raza</button>
            </Link>
            <span id='name'>Alfredo M. Blanco</span>
          </div>
          <div className="optionContainer">

            <div className="filters">
              <select onChange={e => handleFilter(e)} className='select'>
                <option value= {TODOS}>Filtrar por...</option>
                <option value={EXISTENTES}>Existentes</option>
                <option value={CREADOS}>Creados</option>
              </select> 
              <select onChange={e => handleTemp(e)} className='select'>
                <option value={TODOS} >Temperamento</option>

                {
                  temps?.map( e => {
                    return <option value={e} key={e}>{e}</option>
                  })
                }
              </select>
              <select onChange={e => handleOrder(e)} className='select'>
                <option value={A_Z}>A - Z</option>
                <option value={Z_A}>Z - A</option>
                <option value={ASC}>Peso ascendente</option>
                <option value={DESC}>Peso descendente</option>
              </select> 
            </div>
            <div>
              <input type="text" placeholder="Introduzca una raza..." 
              onChange={e => handleSearch(e.target.value)} value={search}
              className='select' id="search"/>
              <button onClick={() => handleSearch('')} 
                className='select' id="reset">reset</button>
            </div>
          
          </div>
          <div className="cardcontainer">

          { 
            amostrar.length? amostrar.map(e =>{
              return (
                
                <Card 

                  key= {e.id}
                  id= {e.id}
                  name = {e.name}
                  img = {e.image}
                  weight = {e.weight}
                  temp = {e.temperament}
                />
                
              )
            }
            ) : 
            <h2>No se encontraron razas correspondientes</h2> 
          }
          </div>
          <Pagina  cantPerros= {cantPerros}
              totPerros ={allDogs.length}
              cambioPag = {cambioPag}
              page = {page}
            />
        </div>
    )
}