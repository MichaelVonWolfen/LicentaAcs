import "./postPage.sass"
import Image from "../../Components/image/Image"
import getCategoryDetailAndSetColors from "../../Helpers/setColors";
import Comment from "../../Components/comment/comment"
import CustomInput from "../../Components/inputs/Inputs";
import Button from "../../Components/Button/button";
import axios from "axios";
import WShelper from "../../Websokets/Websockets";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import EInput from "../../Structures/EnumInput";
import {EnumWSpaths} from "../../Structures/EnumWSpaths";
import {InterfaceWebsocketHeader} from "../../Structures/InterfaceWebsocketHeader";
import constants from "../../Config/constants";
import {io} from "socket.io-client";
import {v4 as uuid} from "uuid"

interface Icomment{
    authorID: {
        profile_picture:string,
        username:string
    },
    createdAt:Date,
    content:string,
    isLikedByUser:boolean,
    likesNB:number,
    _id:string
}
interface IpostData{
    title:string,
    post_img:string,
    content:string|undefined
}
export default function PostPage(){
    const initComment:Icomment[] =[{
        authorID:{
            profile_picture:"",
            username:""
        },
        createdAt:new Date(),
        content:"",
        likesNB:0,
        isLikedByUser:false,
        _id:""
    }]
    const initPostData:IpostData={
        title:"",
        post_img:"",
        content:undefined
    }

    const token = localStorage.getItem("token")
    const {category, post} = useParams()
    const [categoryDetails, setCategoryDetails] = useState({})
    const [categoryData, setCategoryData] = useState({category:""})
    const [postData, setPostData] = useState(initPostData)
    const [commentsData, setCommentsData] = useState(initComment)
    const [comments, setComments] = useState([<></>])
    const [userData, setUserData] = useState({
        profile_picture:"",
        _id:"",
        username:"",
    })
    const [socket, setSocket] = useState(io)

    let WSpath = EnumWSpaths.anonymous
    let headers:InterfaceWebsocketHeader = {room_id:post}

    if(token) {
        WSpath = EnumWSpaths.user
        headers["authorization"] = token
    }
    const eventListeners ={
        error: (msg:string)=> console.error(msg),
        connection:function () {
            console.log("We are connected!")
        },
        test: (msg:string) => console.log(msg),
        updated_likes:(payload:Icomment[]) =>{
            console.log("Received commend update")
            console.log(payload)
            setCommentsData(payload)
        }
    }
    WShelper(WSpath,post || "", headers, eventListeners, setSocket)
    useEffect(()=>{
        axios.get(`${constants.BACKEND_URL}/api/categories/${category}`,)
            .then(r =>setCategoryData(r.data))
            .catch(e =>console.log(e))
        axios.get(`${constants.BACKEND_URL}/api/posts/post/${post}`,)
            .then(r => setPostData(r.data))
            .catch(e =>console.log(e))
        if(token) {
            axios.get(`${constants.BACKEND_URL}/api/users/user`, {
                headers: {authorization: token}
            }).then(r => setUserData(r.data)
            ).catch(e => console.log(e))
        }
    },[])
    useEffect(()=>{
        if(!post) return
        socket.emit("getComments", post,(err:string, data:any)=>{
                console.log("data")
                console.log(data)
                if(err){
                    console.log(err)
                    return
                }
                setCommentsData(data)
            }
        )
    }, [socket])
    useEffect(()=>{
        const {category} = categoryData
        if(category){
            setCategoryDetails(getCategoryDetailAndSetColors(category))
        }
    }, [categoryData])
    useEffect(()=>{
        console.log("Comments Data")
        console.log(commentsData)
        let commentsList:JSX.Element[] = []
        if (commentsData === initComment) return
        commentsData.forEach(c =>{
            commentsList.push(
                <Comment author={c.authorID}
                    created={new Date(c.createdAt).toLocaleDateString('ro', { year:"numeric", month:"short", day:"numeric"})}
                    image={c.authorID.profile_picture || "/images/default-user-image.png"}
                    text={c.content}
                    isLikedByUser ={c.isLikedByUser}
                    likes_NB={c.likesNB}
                    key={uuid()}
                    id={c._id}
                    currentLoggedUser={userData}
                    socket={socket}
                />)
        })
        setComments(commentsList)
    },[commentsData])

    return(
        <div className="PostContainer">
            <h1 className={"titlePost"}>{postData.title}</h1>
            <Image image={postData.post_img || "/images/default-user-image.png"}/>
            {/* @ts-ignore */}
            <p className={"post_content"} dangerouslySetInnerHTML={{__html: postData.content && postData.content.replace(/(?:\r\n|\r|\n)/g, '</p><p>')}}/>
            <div className="comments">
                {token?
                    <div className="add_comment">
                        <img src={userData.profile_picture || "/images/default-user-image.png"} alt="" className={"profile_image"}/>
                        <strong className="username">{userData.username}</strong>
                        <CustomInput type={EInput.textarea} name={"content"} placeholder={' Add comment'} additionalClasses={"commentArea"}/>
                        <div className="buttons">
                            <Button text={"Comment"} customClickEvent={()=>{}} additionalClasses={"post"} type={"defaultButton"}
                                    isDisabled={false}/>
                            <Button text={"Discard"} link={"/"} additionalClasses={"discard"} type={"defaultButton"}
                                    isDisabled={false}/>
                        </div>
                    </div> :
                    <div className="add_comment">
                        <img src="/images/default-user-image.png" alt="Default profile picture" className={"profile_image"}/>
                        <strong className="username">Log IN to add comments</strong>
                        <CustomInput type={EInput.textarea} name={"content"} placeholder={' Add comment'} additionalClasses={"commentArea"} disabled={true}/>
                        <div className="buttons">
                            <Button text={"Comment"} customClickEvent={()=>{}} additionalClasses={"post"} type={"defaultButton"} isDisabled={true}/>
                            <Button text={"Discard"} link={"/"} additionalClasses={"discard"} type={"defaultButton"} isDisabled={true}/>
                        </div>
                    </div>
                }
                <div className="comments_section">
                    {comments}
                </div>
            </div>
        </div>
    )
}