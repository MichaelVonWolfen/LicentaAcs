import React from "react";
import Button from "../button/button";
import * as constants from "../../constants";
import "./home.css"
import Category from "../category/category";
export default function home(){
    const expandOrRetractCategories = (e)=>{
        const categories = document.querySelector('#categories')
        let isExpanded = categories.classList.contains("expanded")
        if(isExpanded) {
            categories.classList.remove('expanded')
            e.target.innerText = "Explore More"
        }else {
            categories.classList.add("expanded")
            e.target.innerText = "Explore Less"
        }
    };
    return(
        <div className={"home"}>
            <div className="title">
                <div className="background_header">
                    <div className="header_title">
                        <h1>Discover,</h1>
                        <h1 className={"offset-1"}>Explore&nbsp;and&nbsp;Share</h1>
                        <h1 className={"offset-2"}>your&nbsp;special&nbsp;Experiences</h1>
                        <h5>On the worlds largest blog</h5>
                        <div className="info">
                            <span className="details">
                                <strong>2.8M </strong>
                                Splits
                            </span>
                            <span className="details">
                                <strong>52M </strong>
                                Users
                            </span>
                            <span className="details">
                                <strong>1.4M </strong>
                                Bloggers
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="transparent_bar">
                <h6>One blog</h6>
                <h6>Dozens of personalities</h6>
            </div>
            <h2 className="most-popular">Our most popular splits</h2>
            <div className="categories expanded" id={"categories"}>
                <Category image={constants.IMAGE} color="#7F90C5" name={ "workout"}/>
                <Category image={constants.IMAGE2} color="#7FC58D" name={ "Diet"}/>
                <Category image={constants.IMAGE} color="purple" name={ "workout"}/>
                <Category image={constants.IMAGE} color="#7F90C5" name={ "workout"}/>
                <Category image={constants.IMAGE2} color="#7FC58D" name={ "Diet"}/>
                <Category image={constants.IMAGE} color="purple" name={ "workout"}/>
                <Category image={constants.IMAGE} color="#7F90C5" name={ "workout"}/>
                <Category image={constants.IMAGE2} color="#7FC58D" name={ "Diet"}/>
                <Category image={constants.IMAGE} color="purple" name={ "workout"}/>
                <Category image={constants.IMAGE} color="#7F90C5" name={ "workout"}/>
                <Category image={constants.IMAGE2} color="#7FC58D" name={ "Diet"}/>
                <Category image={constants.IMAGE} color="purple" name={ "workout"}/>
                <Category image={constants.IMAGE} color="#7F90C5" name={ "workout"}/>
                <Category image={constants.IMAGE2} color="#7FC58D" name={ "Diet"}/>
                <Category image={constants.IMAGE} color="purple" name={ "workout"}/>
                <Category image={constants.IMAGE} color="#7F90C5" name={ "workout"}/>
                <Category image={constants.IMAGE2} color="#7FC58D" name={ "Diet"}/>
                <Category image={constants.IMAGE} color="purple" name={ "workout"}/>
                <Category image={constants.IMAGE} color="#7F90C5" name={ "workout"}/>
                <Category image={constants.IMAGE2} color="#7FC58D" name={ "Diet"}/>
                <Category image={constants.IMAGE} color="purple" name={ "workout"}/>
                <Category image={constants.IMAGE} color="#7F90C5" name={ "workout"}/>
                <Category image={constants.IMAGE2} color="#7FC58D" name={ "Diet"}/>
                <Category image={constants.IMAGE} color="purple" name={ "workout"}/>
                <Category image={constants.IMAGE} color="#7F90C5" name={ "workout"}/>
                <Category image={constants.IMAGE2} color="#7FC58D" name={ "Diet"}/>
                <Category image={constants.IMAGE} color="purple" name={ "workout"}/>
                <Category image={constants.IMAGE} color="#7F90C5" name={ "workout"}/>
                <Category image={constants.IMAGE2} color="#7FC58D" name={ "Diet"}/>
                <Category image={constants.IMAGE} color="purple" name={ "workout"}/>
                <Category image={constants.IMAGE} color="#7F90C5" name={ "workout"}/>
                <Category image={constants.IMAGE2} color="#7FC58D" name={ "Diet"}/>
                <Category image={constants.IMAGE} color="purple" name={ "workout"}/>
                <Category image={constants.IMAGE} color="#7F90C5" name={ "workout"}/>
                <Category image={constants.IMAGE2} color="#7FC58D" name={ "Diet"}/>
                <Category image={constants.IMAGE} color="purple" name={ "workout"}/>
                <Category image={constants.IMAGE} color="#7F90C5" name={ "workout"}/>
                <Category image={constants.IMAGE2} color="#7FC58D" name={ "Diet"}/>
                <Category image={constants.IMAGE} color="purple" name={ "workout"}/>
                <Category image={constants.IMAGE} color="#7F90C5" name={ "workout"}/>
                <Category image={constants.IMAGE2} color="#7FC58D" name={ "Diet"}/>
                <Category image={constants.IMAGE} color="purple" name={ "workout"}/>
            </div>
            <div className="explore">
                <Button text={"Explore More"} customClickEvent={expandOrRetractCategories}/>
            </div>
        </div>
    )
}