import "./button.css"

export default function Button(props){
    let button, link;
    const  additionalClasses = !props.additionalClasses ? "" : props.additionalClasses
    function redirect(e){
        window.location.href=link
    }
    if(props.link) {
        link = props.link
        button = (
            <span className={"spanFlex"}>
                <button className={"button" + " " + additionalClasses} onClick={redirect}>{props.text}</button>
            </span>
        )
    }else{
        button = (
            <span className={"spanFlex"}>
                <button className={"button"+ " " + additionalClasses} onClick={props.customClickEvent}>{props.text}</button>
            </span>
        )
    }
    return(
        <div className="button_parent">
            {button}
        </div>
    )
}