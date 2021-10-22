import "./comment.css"
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
export default function comment(props){
    return(
        <div className={"comment_container"}>
            <div className="left">
                <img className={"profile_image"} src={props.image} alt=""/>
                <div className="reactions">
                    <span className="likes_container">
                        <FavoriteIcon className={"heart_icon"}/>
                        <span className={"likes_total"}>{props.likes}</span>
                    </span>
                    <ReplyAllIcon className={"reply"}/>
                </div>
            </div>
            <div className="right">
                <div className="top">
                    <strong className={"username"}>
                        {props.user}
                    </strong>
                    <span className="creation_date">
                        {props.created}
                    </span>
                </div>
                <p className={"comment_text"}>
                    {props.text}
                </p>
            </div>
        </div>
    )
}