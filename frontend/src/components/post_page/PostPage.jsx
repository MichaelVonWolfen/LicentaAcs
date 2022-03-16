import "./postPage.css"
import Image from "../image/Image"
import getCategoryDetailAndSetColors from "../helpers/setColors";
import Comment from "../comment/Comment"
import CustomInput from "../inputs/Inputs";
import React, {useEffect, useState} from "react";
import Button from "../button/Button";
import {useParams} from "react-router-dom";
import axios from "axios";
export default function PostPage(props){
    const token = localStorage.getItem("token")
    const {category, post} = useParams()
    const [categoryDetails, setCategoryDetails] = useState({})
    const [categoryData, setCategoryData] = useState({})
    const [postData, setPostData] = useState({})
    const [commentsData, setCommentsData] = useState([])
    const [comments, setComments] = useState([])
    const [userData, setUserData] = useState({})

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
        axios.get(`/api/comments/${post}`,).then(r =>{
            let rawComments = r.data
            setCommentsData(rawComments)
        }).catch(e =>{
            console.log(e)
        })
        if(token){
            axios.get(`/api/users/user`,{
                headers:{
                    authorization: token
                }
            }).then(r =>{
                let resp = r.data
                setUserData(resp)
            }).catch(e =>{
                console.log(e)
            })
        }

    },  [])
    useEffect(()=>{
        const {category} = categoryData
        if(category){
            setCategoryDetails(getCategoryDetailAndSetColors(category))
        }
    }, [categoryData])
    useEffect(()=>{
        let commentsList = []
        console.log(commentsData)
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
                />)
        })
        setComments(commentsList)
    },[commentsData])
    return(
        <div className="PostContainer">
            <h1 className={"titlePost"}>{postData.title}</h1>
            <Image image={postData.post_img || "/images/default-user-image.png"}/>
            <p className={"post_content"} dangerouslySetInnerHTML={{__html: postData.content && postData.content.replace(/(?:\r\n|\r|\n)/g, '</p><p>')}}/>
            <div className="comments">
                {token?
                    <div className="add_comment">
                        <img src={userData.profile_picture || "/images/default-user-image.png"} alt="" className={"profile_image"}/>
                        <strong className="username">{userData.username}</strong>
                        <CustomInput type={"textarea"} name={"content"} placeholder={' Add comment'} additionalClasses={"commentArea"}/>
                        <div className="buttons">
                            <Button text={"Comment"} customClickEvent={()=>{}} additionalClasses={"post"} type={"defaultButton"} isDissabled={false}/>
                            <Button text={"Discard"} link={"/"} additionalClasses={"discard"} type={"defaultButton"} isDissabled={false}/>
                        </div>
                    </div> :
                    <div className="add_comment">
                        <img src="/images/default-user-image.png" alt="Default profile picture" className={"profile_image"}/>
                        <strong className="username">Log IN to add comments</strong>
                        <CustomInput type={"textarea"} name={"content"} placeholder={' Add comment'} additionalClasses={"commentArea"} disabled={true}/>
                        <div className="buttons">
                            <Button text={"Comment"} customClickEvent={()=>{}} additionalClasses={"post"} type={"defaultButton"} isDissabled={true}/>
                            <Button text={"Discard"} link={"/"} additionalClasses={"discard"} type={"defaultButton"} isDissabled={true}/>
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