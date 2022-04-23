import CustomInput from "../../Components/inputs/Inputs";
import React, {FormEvent, FormEventHandler, FormHTMLAttributes, useEffect, useState} from "react";
import Button from "../../Components/Button/button"
import "./createCategory.sass"
import getCategoryDetailAndSetColors from "../../Helpers/setColors";
import EInput from "../../Structures/EnumInput"
import constants from "../../Config/constants";
import {log} from "util";
import axios from "axios";

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

    function handleSubmit(e:HTMLFormElement & EventTarget | any) {
        e.preventDefault()
        const token = localStorage.getItem("token")
        if(!e.target || !token) return
        const data:any = {}
        for (let entry of new FormData(e.target).entries()) {
            if(data[entry[0]] !== "image")
                data[entry[0]] = entry[1]
        }
        console.log(data)
        fetch(`${constants.BACKEND_URL}/api/categories`,{
            method:"POST",
            headers:{
                authorization: token,
            },
            body: new FormData(e.target)
        }).then(r =>{
            console.log(r.status)
            if(r.status < 400) window.location.href = "/"
            else {
                r.text().then(response =>{
                    alert(response)
                })
            }
        })
    }

    return(
        <form action="/" method="post" className="add-category-container" onSubmit={handleSubmit}>
            <div className="left">
                <CustomInput type={EInput.text} name={"name"} placeholder={'Add Subject'} additionalClasses={"titleInput"}/>
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
                <CustomInput type={EInput.file} name={"image"} placeholder={'Add file'} additionalClasses={"fileAddClass"}/>
                <div className="buttons">
                    <Button text={"Create"} customClickEvent={()=>{}} additionalClasses={"post"}/>
                    <Button text={"Discard"} link={"/"} additionalClasses={"discard"} type={"submit"} customClickEvent={()=>{}}/>
                </div>
            </div>
        </form>
    )
}
