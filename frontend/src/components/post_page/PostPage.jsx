import "./postPage.css"
import * as constants from "../../constants";
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
    console.log(category)

    useEffect(()=>{
        axios.get(`/api/categories/${category}`,).then(r =>{
            let data = r.data
            setCategoryData(data);
        }).catch(e =>{
            console.log(e)
        })
        axios.get(`/api/posts/post/${post}`,).then(r =>{
            let data = r.data
            console.log(data)
            setPostData(data)
        }).catch(e =>{
            console.log(e)
        })
    },  [])
    useEffect(()=>{
        const {category} = categoryData
        if(category){
            setCategoryDetails(getCategoryDetailAndSetColors(category))
        }
    }, [categoryData])
    return(
        <div className="PostContainer">
            <h1 className={"titlePost"}>{postData.title}</h1>
            <Image image={postData.post_img}/>
            <p className={"post_content"} dangerouslySetInnerHTML={{__html: postData.content && postData.content.replace(/(?:\r\n|\r|\n)/g, '</p><p>')}}/>
            <div className="comments">
                {token?
                    <div className="add_comment">
                        <img src={constants.LSAC_CHAN} alt="" className={"profile_image"}/>
                        <strong className="username">LSAC CHAN</strong>
                        <CustomInput type={"textarea"} name={"content"} placeholder={' Add comment'} additionalClasses={"commentArea"}/>
                        <div className="buttons">
                            <Button text={"Comment"} customClickEvent={""} additionalClasses={"post"} type={"defaultButton"} isDissabled={true}/>
                            <Button text={"Discard"} link={"/"} additionalClasses={"discard"} type={"defaultButton"} isDissabled={true}/>
                        </div>
                    </div> :
                    <div className="add_comment">
                        <img src="/images/default-user-image.png" alt="Default profile picture" className={"profile_image"}/>
                        <strong className="username">Log IN to add comments</strong>
                        <CustomInput type={"textarea"} name={"content"} placeholder={' Add comment'} additionalClasses={"commentArea"} disabled={true}/>
                        <div className="buttons">
                            <Button text={"Comment"} customClickEvent={""} additionalClasses={"post"} type={"defaultButton"} isDissabled={false}/>
                            <Button text={"Discard"} link={"/"} additionalClasses={"discard"} type={"defaultButton"} isDissabled={false}/>
                        </div>
                    </div>
                }
                <div className="comments_section">
                    <Comment user={"Lsac-Chan"} created={"12 minutes ago"} image={constants.MaskImage} text={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, consequatur."} likes={Math.floor(Math.random()*100)}/>
                    <Comment user={"Lsac-Chan"} created={"12 minutes ago"} image={constants.DesertImage} text={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, consequatur.At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."} likes={Math.floor(Math.random()*100)}/>
                    <Comment user={"Lsac-Chan"} created={"12 minutes ago"} image={constants.YogaImage} text={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, consequatur."} likes={Math.floor(Math.random()*100)}/>
                </div>
            </div>
        </div>
    )
}