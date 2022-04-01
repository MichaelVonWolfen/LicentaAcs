import React, {useEffect} from "react";
import "./comment.sass"
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useState} from "react";

interface commentInterface {
    likes:string[],
    author: {username:string},
    created:string,
    image:string,
    text:string,
    id:string,
    currentLoggedUser: {_id:string},
    likeHandler:any
}
export default function Comment({likes, author, created, image, text, id, currentLoggedUser, likeHandler}:commentInterface){
    const [isLiked, setIsLiked] = useState(likes.find(userID => currentLoggedUser._id === userID) !== undefined)
    let [likesNB, setLikes] = useState(likes.length)

    useEffect(()=>{
        setLikes(likes.length)
    }, [])
    const likeButtonHandler = () =>{
        likeHandler({id, isLiked, setLikes, likesNB, setIsLiked})
        // console.log(sendMessage)
        // sendMessage("likeChange",
        //     {
        //         msg:id,
        //         callback: (err:string)=> {
        //             //if isliked == true, then decrease nb of likes before setting isLiked as false
        //             if (!err) {
        //                 !isLiked ? setLikes(likesNB + 1) : setLikes(likesNB - 1)
        //                 setIsLiked(!isLiked)
        //             }
        //         }
        //     })
        // socket.emit("likeChange", id, (err)=>{
        //     //if isliked == true, then decrease nb of likes before setting isLiked as false
        //     if(!err){
        //         !isLiked ? setLikes(likesNB + 1) : setLikes(likesNB - 1)
        //         setIsLiked(!isLiked)
        //     }
        // })
    }
    return(
        <div className={"comment_container"}>
            <div className="left">
                <img className={"profile_image"} src={image} alt=""/>
                <div className="reactions">
                    <span className="likes_container" onClick={likeButtonHandler} id={"hearth"}>
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