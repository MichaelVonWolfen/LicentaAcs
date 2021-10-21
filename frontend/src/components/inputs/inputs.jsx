import "./inputs.css"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function CustomInput(props){
    const  additionalClasses = !props.additionalClasses ? "" : props.additionalClasses

    function fileAdded(e) {
        let fileName = e.target.value.split("\\")
        fileName = fileName[fileName.length - 1].split("/")
        fileName = fileName[fileName.length - 1]
        if(fileName.length > 15)
            fileName = fileName.substring(0,15) + "..."
        let label = document.querySelector("#labelText")
        label.innerHTML = fileName
    }

    switch (props.type) {
        case "textarea":
            return(
                <textarea name={props.name} placeholder={props.placeholder} className={"input " + additionalClasses}/>
            )
        case "file":
            return (
                <div className={"input file " + additionalClasses}>
                    <label htmlFor="fileUpload">
                        <CloudUploadIcon className={"image"}/>
                        <span id={"labelText"}>Upload Image</span>
                    </label>
                    <input type="file" name={props.name} accept="image/png, image/jpeg"id="fileUpload" onChange={fileAdded}/>
                </div>
            )
        default:
                return(
                    <input type={props.type} name={props.name} placeholder={props.placeholder} className={"input " + additionalClasses}/>
                );
    }
}