import CustomInput from "../../Components/inputs/Inputs";
import React, {useEffect, useState} from "react";
import Button from "../../Components/Button/button"
import "./createPost.sass"
import getCategoryDetailAndSetColors from "../../Helpers/setColors";
import {useParams} from "react-router-dom";
import EInput from "../../Structures/EnumInput"
import axios from "axios";
import constants from "../../Config/constants";

export default function CreatePost(){
    let {category} = useParams()
    const [categoryData, setCategoryData] = useState({category:""})
    useEffect(()=>{
        axios.get(`${constants.BACKEND_URL}/api/categories/${category}`,)
            .then(r => {
                setCategoryData(r.data)
            })
            .catch(e =>console.log(e))
    }, [])
    useEffect(()=>{
        const {category} = categoryData
        if(category !== ''){
            getCategoryDetailAndSetColors(category)
        }
    }, [categoryData])
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
