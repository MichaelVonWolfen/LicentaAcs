import "./button.css"

export default function Button(props){
    let button, link;
    function redirect(e){
        window.location.href=link
    }
    if(props.link) {
        link = props.link
        button = (
            <button className="button" onClick={redirect}>{props.text}</button>
        )
    }else{
        button = (
            <button className="button">{props.text}</button>
        )
    }
    return(
        <div className="button_parent">
            {button}
        </div>
    )
}