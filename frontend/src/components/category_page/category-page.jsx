import React from "react";
import Button from "../button/button"
import Post from "../post/Post";
import * as constants from "../../constants";
import "./category-page.css"
import getCategoryDetailAndSetColors from "../helpers/setColors";
export default function categoryPage(props) {
    console.log(`Props:${props.match.params.category}`)

    const sortPosts = (e)=>{
        console.log(e.target.innerText)
    };
    const categoryDetails = getCategoryDetailAndSetColors(props.match.params.category)
    return(
        <div className="categories_page_container">
            <h1>{categoryDetails.name}</h1>
            <div className="sort_buttons">
                <h2>Sort by</h2>
                <div className="buttons">
                    <Button text={"Comments"} customClickEvent={sortPosts}/>
                    <Button text={"Kudos"} customClickEvent={sortPosts}/>
                    <Button text={"Date"} customClickEvent={sortPosts}/>
                </div>
            </div>
            <div className="posts_container">
                <Post image={constants.IMAGE} date={"20-oct-2021"} likeNb={Math.floor(Math.random()*1000)} commNb={Math.floor(Math.random()*1000)} state={"saved"}/>
                <Post image={constants.IMAGE} date={"20-oct-2021"} likeNb={Math.floor(Math.random()*1000)} commNb={Math.floor(Math.random()*1000)} state={"saved"}/>
                <Post image={constants.IMAGE} date={"20-nov-2021"} likeNb={Math.floor(Math.random()*1000)} commNb={Math.floor(Math.random()*1000)} state={"saved"}/>
                <Post image={constants.IMAGE} date={"20-oct-2021"} likeNb={Math.floor(Math.random()*1000)} commNb={Math.floor(Math.random()*1000)} state={"saved"}/>
                <Post image={constants.IMAGE} date={"20-oct-2021"} likeNb={Math.floor(Math.random()*1000)} commNb={Math.floor(Math.random()*1000)} state={"not_saved"}/>
                <Post image={constants.IMAGE} date={"20-nov-2021"} likeNb={Math.floor(Math.random()*1000)} commNb={Math.floor(Math.random()*1000)} state={"not_saved"}/>
                <Post image={constants.IMAGE} date={"20-oct-2021"} likeNb={Math.floor(Math.random()*1000)} commNb={Math.floor(Math.random()*1000)} state={"not_saved"}/>
                <Post image={constants.IMAGE} date={"20-oct-2021"} likeNb={Math.floor(Math.random()*1000)} commNb={Math.floor(Math.random()*1000)} state={"not_saved"}/>
                <Post image={constants.IMAGE} date={"20-oct-2021"} likeNb={Math.floor(Math.random()*1000)} commNb={Math.floor(Math.random()*1000)} state={"not_saved"}/>
                <Post image={constants.IMAGE} date={"20-oct-2021"} likeNb={Math.floor(Math.random()*1000)} commNb={Math.floor(Math.random()*1000)} state={"not_saved"}/>
            </div>
        </div>
    )
}