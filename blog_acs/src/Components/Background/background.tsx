import "./background.sass"
import React, {useState} from "react";
import constants from "../../Config/constants";

interface BackGroundInterface {
    Component:React.ComponentType
}
const Background = (props:BackGroundInterface) => {
    const classes = ["circle", "circle_stroke_only", "multiple_circles"]
    let [width, setWidth] = useState(window.innerWidth);
    let [height, setHeight] = useState(window.innerHeight)

    const handleResize = () =>{
        setWidth(window.innerWidth);
        setHeight(window.innerHeight  - 100);
    }

    const fill_background = () => {
        let elements = []
        let nb_elements = Math.floor(constants.MAX_BACKGROUND_ELEMENTS * width / constants.NUMBER_DECREASER_CONSTANT)
        for(let i = 0; i < nb_elements; i++){
            const style:any = {
                "--radius": Math.floor(Math.random() * constants.MAX_CIRCLE_RADIUS) + 2 + "px",
                "--top_distance":  Math.floor(Math.random() * height) + "px",
                "--left_distance":  Math.floor(Math.random() * width) + "px"
            }
            elements.push(<span className={classes[Math.floor(Math.random()*3)]} style={style} key={i}/>)
        }
        return elements;
    }
    window.addEventListener("resize", handleResize)
    return (
        <div>
            <div className="background">
                {fill_background()}
            </div>
                <props.Component/>
        </div>
    )
}
export default Background;