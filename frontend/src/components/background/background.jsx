import "./background.css"
import React, {useEffect, useState} from "react";
import constants from "../../constants";

const Background = (props) => {
    const clases = ["circle", "circle_stroke_only", "multiple_circles"]
    let [width, setWidth] = useState(window.innerWidth);
    let [height, setHeight] = useState(window.innerHeight)

    const handleResize = () =>{
        setWidth(window.innerWidth);
        setHeight(window.innerHeight  - 100);
    }
    window.addEventListener("resize", handleResize)

    const fill_background = (color) => {
        let elements = []
        for(let i = 0; i < constants.MAX_BACKGROUND_ELEMENTS; i++){
            const style = {
                "--color": color,
                "--radius": Math.floor(Math.random() * constants.MAX_CIRCLE_RADIUS) + "px",
                "--top_distance":  Math.floor(Math.random() * height) + "px",
                "--left_distance":  Math.floor(Math.random() * width) + "px"
            }
            elements.push(<span className={clases[Math.floor(Math.random()*3)]} style={style}/>)
        }
        return elements;
    }
    return (
        <div className="background">
            {fill_background(props.color)}
        </div>
    )
}
export default Background;