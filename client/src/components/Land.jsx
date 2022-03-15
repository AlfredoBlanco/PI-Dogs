import React from "react";
import { Link } from "react-router-dom";
import './Land.css'

export default function Land(){
    return (
        <div className="land">
            <div >
            <Link to = '/home'>
                <button className="start">Ingresar</button>
            </Link>
            </div>
        </div>
    )
}