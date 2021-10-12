import React from "react";
import Background from "../background/background"
import Button from "../button/button";
import * as constants from "../../constants";
import "./home.css"
import Category from "../category/category";

export default function home(){
    return(
        <div>
            <Background color="#CCC5B9" background_color="#252422"/>
            <div className="test">
                <Button link={"http://google.ro"} text="Go to Google"/>
                <Button text={"No redirect button"}/>
                <Button text={"button"}/>
                <Button text={"b"}/>
            </div>
            <Category image={constants.IMAGE} color="#7F90C5" name={ "workout"}/>
            <Category image={constants.IMAGE2} color="#7FC58D" name={ "Diet"}/>
        </div>
    )
}