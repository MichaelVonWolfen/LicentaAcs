import React from "react";
import "./category.sass"

interface categoryInterface {
    color:string,
    name:string,
    image: string,
    path:string
}
export default function Category(props:categoryInterface) {
    const style:any ={
        "--color":props.color,
    }
    const redirect = ()=>{
        window.location.href ="category/" + props.path
    }
    return(
    // @ts-ignore
        <div className="category" style={style} name={props.name} onClick={redirect}>
            <img src={props.image}  alt={props.name}/>
            <button className="filter" name={props.name}/>
        </div>
    )
}