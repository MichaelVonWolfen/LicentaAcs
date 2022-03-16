import React, {useEffect} from "react";
import "./comment.css"
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useState} from "react";
import axios from "axios";
export default function Comment({likes, author, created, image, text, id, currentLoggedUser, socket}){
    const [isLiked, setIsLiked] = useState(likes.find(userID => currentLoggedUser._id === userID) !== undefined)
    let [likesNB, setLikes] = useState(likes.length)

    useEffect(()=>{
        setLikes(likes.length)
    }, [])
    const likeButtonHandler = (e) =>{
        socket.emit("likeChange", id)
        //if isliked == true, then decrease nb of likes before setting isLiked as false
        !isLiked ? setLikes(likesNB + 1) : setLikes(likesNB - 1)
        setIsLiked(!isLiked)
    }
    return(
        <div className={"comment_container"}>
            <div className="left">
                <img className={"profile_image"} src={image} alt=""/>
                <div className="reactions">
                    <span className="likes_container" onClick={likeButtonHandler} id={"hearth"} disabled>
                        {isLiked?
                            <FavoriteIcon className={"heart_icon"}/>:
                            <FavoriteBorderIcon className={"heart_icon"}/>
                        }
                        <span className={"likes_total"}>{likesNB}</span>
                    </span>
                    <ReplyAllIcon className={"reply"}/>
                </div>
            </div>
            <div className="right">
                <div className="top">
                    <strong className={"username"}>
                        {author.username}
                    </strong>
                    <span className="creation_date">
                        {created}
                    </span>
                </div>
                <p className={"comment_text"}>
                    {text}
                </p>
            </div>
        </div>
    )
}