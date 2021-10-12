import React from "react";
import "../helpers/common_styles.css"
import Background from "../background/background"
import Button from "../button/button";

export default function home(){
    return(
        <div>
            <Background color="#CCC5B9" background_color="#252422"/>
            Hello to Home
            <Button link={"http://google.ro"} text="Go to Google"/>
            <Button text={"No redirect button"}/>
        </div>
    )
}