import "./postPage.sass"
import Image from "../../Components/image/Image"
import getCategoryDetailAndSetColors from "../../Helpers/setColors";
import Comment from "../../Components/comment/comment"
import CustomInput from "../../Components/inputs/Inputs";
import Button from "../../Components/Button/button";
import axios from "axios";
import WShelper from "../../Helpers/Websockets";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import EInput from "../../Structures/EnumInput";
import {EnumWSpaths} from "../../Structures/EnumWSpaths";
import {InterfaceWebsocketHeader} from "../../Structures/InterfaceWebsocketHeader";

interface Icomment{
    authorID: {
        profile_picture:string,
        username:string
    },
    createdAt:Date,
    content:string,
    likesList: string[],
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
        likesList:[],
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

    let WSpath = EnumWSpaths.anonymous
    let headers:InterfaceWebsocketHeader = {room_id:post}

    if(token) {
        WSpath = EnumWSpaths.user
        headers["authorization"] = token
    }

    const {socketRef} = WShelper(WSpath,post, headers)

    useEffect(()=>{
        axios.get(`/api/categories/${category}`,).then(r =>{
            let data = r.data
            setCategoryData(data);
        }).catch(e =>{
            console.log(e)
        })
        axios.get(`/api/posts/post/${post}`,).then(r =>{
            let data = r.data
            setPostData(data)
        }).catch(e =>{
            console.log(e)
        })
        if(token) {
            axios.get(`/api/users/user`, {
                headers: {
                    authorization: token
                }
            }).then(r => {
                let resp = r.data
                setUserData(resp)
            }).catch(e => {
                console.log(e)
            })
        }
    },  [])
    // useEffect(()=>{
    //     if(socketRef.current === null) return
    //     // socket.connect()
    //     //mesages received
    //     socketRef.current.on("test", msg => {
    //         console.log(msg)
    //     })
    //     socketRef.current.on("disconnect", ()=>{
    //         socketRef.current.connect()
    //     })
    //
    //     //mesages send on socket load
    //     socketRef.current.emit("getComments", post, (err, data)=>{
    //         if(err){
    //             console.log(err)
    //             return
    //         }
    //         setCommentsData(data)
    //     })
    //     socketRef.current.on("updated_likes", payload =>{
    //         console.log("Data came in Post")
    //         console.log(payload)
    //     })
    // },[socketRef])
    useEffect(()=>{
        const {category} = categoryData
        if(category){
            setCategoryDetails(getCategoryDetailAndSetColors(category))
        }
    }, [categoryData])
    useEffect(()=>{
        let commentsList:JSX.Element[] = []
        console.log(commentsData)
        if (commentsData === initComment) return
        commentsData.forEach(c =>{
            commentsList.push(
                <Comment author={c.authorID}
                    created={new Date(c.createdAt).toLocaleDateString('ro', { year:"numeric", month:"short", day:"numeric"})}
                    image={c.authorID.profile_picture || "/images/default-user-image.png"}
                    text={c.content}
                    likes={c.likesList}
                    id={c._id}
                    key={c._id}
                    currentLoggedUser={userData}
                    socket={undefined}
                />)
                             {/*{"socketRef.current"}*/}
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