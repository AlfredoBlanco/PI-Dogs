import React from "react";
import './Pagina.css';

export default function Pagina({cantPerros, totPerros, cambioPag, page}){
    
    let pages = [];
    let cantpages = Math.ceil( totPerros/ cantPerros );

    for( let i = 0; i< cantpages; i++){
        
        pages.push(i + 1);
    }

    return(
        <nav>
            <ul >
                <li>
                    <button className="page" onClick={() => page > 1? cambioPag(page -1) : ''}>
                        {'<<'}
                    </button>
                </li>
                {
                    
                    pages?.map(e => (
                        <li key={e} >
                            <button className="page" onClick={() => cambioPag(e)}>{e}</button>
                        </li>
                    ))
                }
                <li>
                    <button className="page" onClick={() => page < cantpages? cambioPag(page + 1): ''}>
                        {'>>'}
                    </button>
                </li>
            </ul>
        </nav>
    )

}