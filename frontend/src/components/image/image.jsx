import "./image.css"
import * as constants from "../../constants";
import * as React from "react";
export default function Image(props){
    return (
        <div className="image-container">
            <img src={props.image} alt="Post Image"/>
        </div>
    )
}