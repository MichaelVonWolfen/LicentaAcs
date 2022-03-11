import React, {useEffect} from "react";
import Button from "../button/Button"
import Post from "../post/Post";
import * as constants from "../../constants";
import "./category-page.css"
import getCategoryDetailAndSetColors from "../helpers/setColors";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from "axios";
export default function CategoryPage(props) {
    const category = props.match.params.category
    const sortPosts = (e)=>{
        console.log(e.target.innerText)
    };
    const categoryDetails = getCategoryDetailAndSetColors(props.match.params.category)
    useEffect(()=>{
        axios.get(`/api/categories/${category}`,).then(r =>{
            const posts = r.data;
            console.log(posts)
        }).catch(e =>{
            console.log(e)
        })
    },  [])
    function getPosts() {
        let posts = []
        const templatePosts = constants.posts
        templatePosts.forEach(templatePost =>{
            let post = <Post title={templatePost.title}
                             category = {category}
                             image={templatePost.image}
                             date={templatePost.date}
                             likeNb={templatePost.likeNb}
                             commNb={templatePost.commNb}
                             state={Math.random() > 0.5? "saved":"not_saved"}
            />
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
                <a href={`/add/post/${category}`} className={"new_post_button"}>
                    <AddCircleIcon className={"icon"}/>
                </a>
        </div>
    )
}