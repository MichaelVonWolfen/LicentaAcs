import CustomInput from "../inputs/inputs";
import React from "react";
import Button from "../button/button"
import "./create-post.css"
import getCategoryDetailAndSetColors from "../helpers/setColors";
export default function createPost(props){
    const categoryDetails = getCategoryDetailAndSetColors(props.match.params.category)
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
