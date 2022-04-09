import CustomInput from "../../Components/inputs/Inputs";
import React, {useEffect, useState} from "react";
import Button from "../../Components/Button/button"
import "./createCategory.sass"
import getCategoryDetailAndSetColors from "../../Helpers/setColors";
import EInput from "../../Structures/EnumInput"

const DefaultStyle = {
    primary_color: "#CCC5B9",
    secondary_color: "#252422"
}
export default function CreateCategory(){
    const [categoryData, setCategoryData] = useState({category:{
        style:{
            primary_color: DefaultStyle.primary_color,
            secondary_color: DefaultStyle.secondary_color
        }
    }})
    useEffect(()=>{
        const {category} = categoryData
        getCategoryDetailAndSetColors(category)
    }, [categoryData])
    const handleColorChange = (e:any) =>{
        console.log(e.target.value)
        let primary:HTMLInputElement|null = document.querySelector("#primary_color")
        let secondary:HTMLInputElement|null = document.querySelector("#secondary_color")
        if( !primary || !secondary)
            return;
        setCategoryData({category:{
                style:{
                    primary_color: primary.value,
                    secondary_color: secondary.value
                }
            }})
    }
    return(
        <form action="/" method="post" className="add-category-container">
            <div className="left">
                <CustomInput type={EInput.text} name={"title"} placeholder={'Add Subject'} additionalClasses={"titleInput"}/>
                <div className="colorInputs">
                    <label htmlFor="primary_color" className="colorInput">
                        Primary Color
                        <CustomInput placeholder={""} name={"primary_color"} additionalClasses={"mousePointer"} type={EInput.color} onChange={handleColorChange} value={categoryData.category.style.primary_color}/>
                    </label>
                        <label htmlFor="secondary_color" className="colorInput">
                            Secondary Color
                            <CustomInput placeholder={""} name={"secondary_color"} additionalClasses={"mousePointer"} type={EInput.color} onChange={handleColorChange} value={categoryData.category.style.secondary_color}/>
                        </label>
                </div>
            </div>
            <div className="right">
                <CustomInput type={EInput.file} name={"file"} placeholder={'Add file'} additionalClasses={"fileAddClass"}/>
                <div className="buttons">
                    <Button text={"Create"} customClickEvent={()=>{}} additionalClasses={"post"}/>
                    <Button text={"Discard"} link={"/"} additionalClasses={"discard"} type={"submit"} customClickEvent={()=>{}}/>
                </div>
            </div>
        </form>
    )
}
