import React from "react";

function Card(props)
{
    return(
        <div>
            <h1>{props.name}</h1>
            <img alt="ay 7ega" src={props.image}/>
            <p>{props.tel}</p>
            <p>{props.email}</p>
        </div>
       
    );
}

export default Card;