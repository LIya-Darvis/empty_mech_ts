import React, {FC} from "react";
import "../App.css";
import { NavLink } from "react-router-dom";

interface CardProps  {
    id?: number;
    title?: string;
    access?: boolean;
}

// очередная паническая атака приводит к цитированию Грибоедова

export const Card: FC<CardProps> = 
    ({
        id,
        title,
        access
    }) => {
        return (
            <NavLink to={'/'}>
                <div className="card">
                    
                    <h1 className="card_text">{title}</h1>
                    
                </div>
            </NavLink>
            
        );
};

export default Card;




