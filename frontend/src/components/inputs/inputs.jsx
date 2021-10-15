import "./inputs.css"

export default function CustomInput(props){
    switch (props.type) {
        case "textarea":
            return(
                <textarea name={props.name} cols="30" rows="10" placeholder={props.placeholder} className={"input"}/>
            )
        case "file":
            return (
                <input type="file" name={props.name} accept="image/png, image/jpeg" className={"input"}/>
            )
        default:
                return(
                    <input type={props.type} name={props.name} placeholder={props.placeholder} className={"input"}/>
                );
    }
}