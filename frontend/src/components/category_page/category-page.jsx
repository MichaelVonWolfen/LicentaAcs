import React from "react";
import Button from "../button/button"
import Post from "../post/Post";
import * as constants from "../../constants";
import "./category-page.css"

export default function categoryPage(props) {
    console.log(`Props:${props.match.params.category}`)
    function getCategoryDetails(category) {
        //TODO get category color palette from backend
        return {
            background_color:"#2A2D41",
            color:"#7F90C5",
            name:"Workout"
        };
    }
    function setCategoryColors({background_color, color}) {
        document.body.style =`--background-color: ${background_color};--color: ${color};`
    }
    const sortPosts = (e)=>{
        console.log(e.target.innerText)
    };
    let categoryDetails = getCategoryDetails(props.match.params.category)
    const resetCategoryColors = (e) => {
      if(categoryDetails)
          setCategoryColors(categoryDetails)
    }
    setCategoryColors(categoryDetails)
    window.addEventListener("resize", resetCategoryColors)
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