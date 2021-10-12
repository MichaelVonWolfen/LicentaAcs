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

    const fill_background = (color, bkg) => {
        let elements = []
        document.body.style =`--background-color: ${bkg};--color: ${color};`
        let nb_elements = Math.floor(constants.MAX_BACKGROUND_ELEMENTS * width / constants.NUMBER_DECREASER_CONSTANT)
        console.log(nb_elements)
        for(let i = 0; i < nb_elements; i++){
            const style = {
                "--radius": Math.floor(Math.random() * constants.MAX_CIRCLE_RADIUS) + "px",
                "--top_distance":  Math.floor(Math.random() * height) + "px",
                "--left_distance":  Math.floor(Math.random() * width) + "px"
            }
            elements.push(<span className={clases[Math.floor(Math.random()*3)]} style={style}/>)
        }
        return elements;
    }
    window.addEventListener("resize", handleResize)
    return (
        <div className="background">
            {fill_background(props.color, props.background_color)}
        </div>
    )
}
export default Background;