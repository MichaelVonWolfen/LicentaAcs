import React, {useEffect} from "react";
import "./comment.css"
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useState} from "react";
import axios from "axios";
export default function Comment({likes, user, created, image, text, id}){
    const token = localStorage.getItem("token")
    const init_likes = likes.length
    let [likesNB, setLikes] = useState(likes.length)
    let [Favourite, setFav] = useState(<FavoriteBorderIcon className={"heart_icon"} />)
    useEffect(()=>{
        // console.log("likesNB")
        // console.log(likesNB)
        // if(likes.find(like => like === user._id))
    }, [likesNB])
    const likeButtonHandler = (e) =>{
        if(!token) return;
        if (likesNB === init_likes){
            setLikes(init_likes + 1);
            setFav(<FavoriteIcon className={"heart_icon"}/>)
        }else{
            setLikes(init_likes);
            setFav(<FavoriteBorderIcon className={"heart_icon"}/>)
        }
        axios.patch("/api/comments/like",{
            commentID: id
        },{
            headers:{
                authorization: `${token}`
            }
        })
    }
    return(
        <div className={"comment_container"}>
            <div className="left">
                <img className={"profile_image"} src={image} alt=""/>
                <div className="reactions">
                    <span className="likes_container" onClick={likeButtonHandler} id={"hearth"} disabled>
                        {Favourite}
                        <span className={"likes_total"}>{likesNB}</span>
                    </span>
                    <ReplyAllIcon className={"reply"}/>
                </div>
            </div>
            <div className="right">
                <div className="top">
                    <strong className={"username"}>
                        {user.username}
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