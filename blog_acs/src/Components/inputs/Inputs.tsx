import React, {FormEvent, InputHTMLAttributes} from "react";
import "./inputs.sass"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EnumInput from "../../Structures/EnumInput"
import EInput from "../../Structures/EnumInput"

interface ICustomInput {
    placeholder:string,
    name:string,
    additionalClasses:string | undefined,
    type:EnumInput,
    disabled?:boolean,
    onChange?:any
    value?:string
}
export default function CustomInput(props:ICustomInput){
    const  additionalClasses = !props.additionalClasses ? "" : props.additionalClasses

    function fileAdded(e:any) {
        let fileName = e.target.value.split("\\")
        fileName = fileName[fileName.length - 1].split("/")
        fileName = fileName[fileName.length - 1]
        if(fileName.length > 15)
            fileName = fileName.substring(0,15) + "..."
        let label = document.querySelector("#labelText")
        label && (label.innerHTML=fileName);
    }

    switch (props.type) {
        case EInput.textarea:
            return(
                <textarea name={props.name} placeholder={props.placeholder} className={"input " + additionalClasses} disabled={props.disabled || false}/>
            )
        case EInput.file:
            return (
                <div className={"input file " + additionalClasses}>
                    <label htmlFor="fileUpload">
                        <CloudUploadIcon className={"image"}/>
                        <span id={"labelText"}>Upload Image</span>
                    </label>
                    <input type="file" name={props.name} accept="image/png, image/jpeg"id="fileUpload" onChange={fileAdded}/>
                </div>
            )
        case EInput.color:
            return (
                <input type="color" name={props.name} id={props.name} onChange={props.onChange} value={props.value}/>
            )
        default:
                return(
                    <input type={props.type} name={props.name} placeholder={props.placeholder} className={"input " + additionalClasses}/>
                );
    }
}