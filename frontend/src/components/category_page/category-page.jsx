import React from "react";
import Button from "../button/button"
import Post from "../post/Post";
import * as constants from "../../constants";
import "./category-page.css"
import getCategoryDetailAndSetColors from "../helpers/setColors";
export default function categoryPage(props) {
    const category = props.match.params.category

    const sortPosts = (e)=>{
        console.log(e.target.innerText)
    };
    const categoryDetails = getCategoryDetailAndSetColors(props.match.params.category)

    function getPosts() {
        let posts = []
        const templatePosts = constants.posts
        templatePosts.forEach(templatePost =>{
            let post = <Post title={templatePost.title}
                             category = {category}
                             image={templatePost.image}
                             date={templatePost.date}
                             likeNb={Math.floor(Math.random()*1000)}
                             commNb={Math.floor(Math.random()*1000)}
                             state={"not_saved"
                             }/>
            posts.push(post)
        })
        return posts
    }

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
                {getPosts()}
            </div>
        </div>
    )
}