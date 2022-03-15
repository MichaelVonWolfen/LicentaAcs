import React, {useState} from "react";
import "./button.sass"

export default function Button({additionalClasses,text,customClickEvent,link, type, isDissabled}){
    const [sortingOrder, setSortingOrder] = useState(1)
    let button;
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

    if(link) {
        button = (
            <span className={"spanFlex"}>
                <button className={"button" + " " + (additionalClasses || "")} onClick={redirect} disabled={isDissabled || false}>{text}</button>
            </span>
        )
    }if(type === "defaultButton"){
        button = (
            <span className={"spanFlex"}>
                <button className={"button"+ " " + additionalClasses} onClick={customClickEvent} disabled={isDissabled || false}>{text}</button>
            </span>
        )
    }else{
        button = (
            <span className={"spanFlex"}>
                <button className={"button"+ " " + additionalClasses} onClick={()=>{customClickEvent(sortingOrder,updateSortingOrder)}} disabled={isDissabled || false}>{text}</button>
            </span>
        )
    }
    return(
        <div className="button_parent">
            {button}
        </div>
    )
}