import CustomInput from "../inputs/inputs";
import React from "react";
import {Button} from "@mui/material";

export default function createPost(props){
    console.log(props.match)
    return(
        <div className="add-post-container">
            <div className="left">
                <CustomInput type={"text"} name={"title"} placeholder={'Add Title'}/>
                <CustomInput type={"textarea"} name={"content"} placeholder={'Add your special experiences'}/>
            </div>
            <div className="right">
                <CustomInput type={"file"} name={"file"} placeholder={'Add file'}/>
                <div className="buttons">
                    <Button text={"Comments"} customClickEvent={sortPosts}/>
                </div>
            </div>
        </div>
    )
}
