import React, {MouseEventHandler, useState} from "react";
import "./button.sass"

interface buttonInterface {
    text:string,
    customClickEvent?:any,
    additionalClasses?:string,
    link?:string,
    type?:string,
    isDisabled?:boolean
}
export default function Button({additionalClasses,text,customClickEvent,link, type, isDisabled}:buttonInterface){
    const [sortingOrder, setSortingOrder] = useState(1)
    let button;
    function redirect(){
        if (typeof link === "string") {
            window.location.href = link
        }
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
                <button className={"button" + " " + (additionalClasses || "")} onClick={redirect} disabled ={isDisabled || false}>{text}</button>
            </span>
        )
    }
    if(type === "defaultButton"){
        button = (
            <span className={"spanFlex"}>
                <button className={"button"+ " " + additionalClasses} onClick={customClickEvent} disabled ={isDisabled || false}>{text}</button>
            </span>
        )
    }else{
        button = (
            <span className={"spanFlex"}>
                <button className={"button"+ " " + additionalClasses} onClick={()=>{ // @ts-ignore
                    customClickEvent(sortingOrder,updateSortingOrder)}} disabled ={isDisabled || false}>{text}</button>
            </span>
        )
    }
    return(
        <div className="button_parent">
            {button}
        </div>
    )
}