import React, {useState} from "react";
import "./button.css"

export default function Button(props){
    const [sortingOrder, setSortingOrder] = useState(1)
    let button, link;
    const  additionalClasses = !props.additionalClasses ? "" : props.additionalClasses
    function redirect(e){
        window.location.href=link
    }

    function updateSortingOrder() {
        switch (sortingOrder){
            case 1:
                setSortingOrder(-1)
                break
            default:
                setSortingOrder(1)
                break
        }
    }

    if(props.link) {
        link = props.link
        button = (
            <span className={"spanFlex"}>
                <button className={"button" + " " + additionalClasses} onClick={redirect}>{props.text}</button>
            </span>
        )
    }else{
        button = (
            <span className={"spanFlex"}>
                <button className={"button"+ " " + additionalClasses} onClick={()=>{props.customClickEvent(sortingOrder,updateSortingOrder)}}>{props.text}</button>
            </span>
        )
    }
    return(
        <div className="button_parent">
            {button}
        </div>
    )
}