import "./image.css"
import * as React from "react";
interface Iimgae {
    image:string
}
export default function Image(props:Iimgae){
    return (
        <div className="image-container">
            <img src={props.image} alt="Post Image" loading={"lazy"}/>
        </div>
    )
}