import React, { useState } from 'react';
import Data from './response.json';
import './BotigaGeneral.css';
import { NavLink, Redirect } from 'react-router-dom';

export default function BotigaGeneral() {

    const cardClicked = (data) =>  {
        return  <Redirect  to={`/Support/Entrevista?='${data.id}`} />
    }

    const cardGenerator = Data.map((data) => {
        return (
            <div className="fullcard" key={data.id} 
            onClick={() => cardClicked(data)}>
                <NavLink style={{ textDecoration: 'none' }} 
                to={{pathname:'/support/'+data.id,
                aboutProps: data}}>
                <div className="card" style={{ width: "26rem" }}>
                    <img className="card-img-top" src={data.img} alt={data.title} />
                    <div className="card-body">
                        <h5 className="card-title" >{data.title}</h5>
                        {/* <p className="card-text">{data.interview.intro}</p> */}
                        <p className="card-text"><small className="text-muted">{data.price}</small></p>
                    </div>
                </div>
                </NavLink>
            </div>
        )
    })

    return (
        <div className="card-deck">
            {cardGenerator}
        </div>
    )

};