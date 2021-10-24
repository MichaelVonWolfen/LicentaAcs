import "./postPage.css"
import * as constants from "../../constants";
import Image from "../image/image"
import getCategoryDetailAndSetColors from "../helpers/setColors";
import Comment from "../comment/comment"
import CustomInput from "../inputs/inputs";
import React from "react";
import Button from "../button/button";
export default function PostPage(props){
    const category = props.match.params.category
    console.log(category)
    const sortPosts = (e)=>{
        console.log(e.target.innerText)
    };
    const categoryDetails = getCategoryDetailAndSetColors(category)
    return(
        <div className="PostContainer">
            <h1 className={"titlePost"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima, quaerat.</h1>
            <Image image={constants.DesertImage}/>
            <p className={"post_content"}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.<br/>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.<br/>
                At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.<br/>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.<br/>
                At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.<br/>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore.<br/>
            </p>
            <div className="comments">
               <div className="add_comment">
                   <img src={constants.LSAC_CHAN} alt="" className={"profile_image"}/>
                   <strong className="username">LSAC CHAN</strong>
                   <CustomInput type={"textarea"} name={"content"} placeholder={' Add comment'} additionalClasses={"commentArea"}/>
                   <div className="buttons">
                       <Button text={"Comment"} customClickEvent={""} additionalClasses={"post"}/>
                       <Button text={"Discard"} link={"/"} additionalClasses={"discard"} type={"submit"}/>
                   </div>
               </div>
                <div className="comments_section">
                    <Comment user={"Lsac-Chan"} created={"12 minutes ago"} image={constants.MaskImage} text={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, consequatur."} likes={Math.floor(Math.random()*100)}/>
                    <Comment user={"Lsac-Chan"} created={"12 minutes ago"} image={constants.DesertImage} text={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, consequatur.At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."} likes={Math.floor(Math.random()*100)}/>
                    <Comment user={"Lsac-Chan"} created={"12 minutes ago"} image={constants.YogaImage} text={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, consequatur."} likes={Math.floor(Math.random()*100)}/>
                </div>
            </div>
        </div>
    )
}