import CustomInput from "../inputs/Inputs";
import React from "react";
import Button from "../button/Button"
import "./create-post.css"
import getCategoryDetailAndSetColors from "../helpers/setColors";
import {useParams} from "react-router-dom";
export default function createPost(){
    let category = useParams()
    const categoryDetails = getCategoryDetailAndSetColors(category)
    return(
        <form action="/" method="post" className="add-post-container">
            <div className="left">
                <CustomInput type={"text"} name={"title"} placeholder={'Add Title'} additionalClasses={"titleInput"}/>
                <CustomInput type={"textarea"} name={"content"} placeholder={'Add your special experiences'} additionalClasses={"contentArea"}/>
            </div>
            <div className="right">
                <CustomInput type={"file"} name={"file"} placeholder={'Add file'} additionalClasses={"fileAddClass"}/>
                <div className="buttons">
                    <Button text={"Save Split"} customClickEvent={""} additionalClasses={"post"}/>
                    <Button text={"Discard"} link={"/"} additionalClasses={"discard"} type={"submit"}/>
                </div>
            </div>
        </form>
    )
}
