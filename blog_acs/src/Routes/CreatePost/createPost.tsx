import CustomInput from "../../Components/inputs/Inputs";
import React from "react";
import Button from "../../Components/Button/button"
import "./createPost.sass"
import getCategoryDetailAndSetColors from "../../Helpers/setColors";
import {useParams} from "react-router-dom";
import EInput from "../../Structures/EnumInput"

export default function CreatePost(){
    let category = useParams()
    const categoryDetails = getCategoryDetailAndSetColors(category)
    return(
        <form action="/" method="post" className="add-post-container">
            <div className="left">
                <CustomInput type={EInput.text} name={"title"} placeholder={'Add Title'} additionalClasses={"titleInput"}/>
                <CustomInput type={EInput.textarea} name={"content"} placeholder={'Add your special experiences'} additionalClasses={"contentArea"}/>
            </div>
            <div className="right">
                <CustomInput type={EInput.file} name={"file"} placeholder={'Add file'} additionalClasses={"fileAddClass"}/>
                <div className="buttons">
                    <Button text={"Save Split"} customClickEvent={()=>{}} additionalClasses={"post"}/>
                    <Button text={"Discard"} link={"/"} additionalClasses={"discard"} type={"submit"} customClickEvent={()=>{}}/>
                </div>
            </div>
        </form>
    )
}
