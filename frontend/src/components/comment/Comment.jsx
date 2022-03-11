import React from "react";
import "./comment.css"
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useState} from "react";
export default function Comment(props){
    const init_likes = props.likes
    let [likes, setLikes] = useState(props.likes)
    let [Favourite, setFav] = useState(<FavoriteBorderIcon className={"heart_icon"} />)
    const increaseLikeAndDissable = (e) =>{
        if (likes === init_likes){
            setLikes(init_likes + 1);
            setFav(<FavoriteIcon className={"heart_icon"}/>)
        }else{
            setLikes(init_likes);
            setFav(<FavoriteBorderIcon className={"heart_icon"}/>)
        }
    }
    return(
        <div className={"comment_container"}>
            <div className="left">
                <img className={"profile_image"} src={props.image} alt=""/>
                <div className="reactions">
                    <span className="likes_container" onClick={increaseLikeAndDissable} id={"hearth"} disabled>
                        {Favourite}
                        <span className={"likes_total"}>{likes}</span>
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