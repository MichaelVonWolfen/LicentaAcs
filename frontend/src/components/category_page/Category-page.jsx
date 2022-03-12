import React, {useEffect, useState} from "react";
import Button from "../button/Button"
import Post from "../post/Post";
import "./category-page.css"
import getCategoryDetailAndSetColors from "../helpers/setColors";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from "axios";
import {useParams} from "react-router-dom";
export default function CategoryPage(props) {
    // const category = props.match.params.category
    const {category} = useParams()
    const [categoryDetails, setCategoryDetails] = useState({})
    const [categoryData, setCategoryData] = useState({})
    const [posts, setPosts] = useState([])

    const sortPosts = (sorter)=>{
        console.log(sorter)
        axios.get(`/api/categories/${category}`,{
            params:{sort:sorter}
        }).then(r =>{
            let data = r.data
            console.log("data")
            console.log(data)
            setCategoryData(data);
        }).catch(e =>{
            console.log(e)
        })
    };
    useEffect(()=>{
        axios.get(`/api/categories/${category}`,).then(r =>{
            let data = r.data
            console.log(data)
            setCategoryData(data);
        }).catch(e =>{
            console.log(e)
        })
    },  [])
    useEffect(()=>{
        const {category, postsList} = categoryData
        if(category){
            setCategoryDetails(getCategoryDetailAndSetColors(category))
        }
        let allPosts = []
        if(postsList){
            postsList.forEach(postElement =>{
                console.log(postElement)
                let post = <Post title={postElement.title}
                                 category = {category.name}
                                 image={postElement.post_img}
                                 date={new Date(postElement.createdAt).toLocaleDateString('ro', { year:"numeric", month:"short", day:"numeric"})}
                                 likeNb={postElement.like_nb}
                                 commNb={postElement.commNb}
                                 key={postElement._id}
                                 state={Math.random() > 0.5? "saved":"not_saved"}
                />
                allPosts.push(post)
            })
            setPosts(allPosts)
        }
    }, [categoryData])
    useEffect(() =>{
        console.log(posts)
    }, [posts])
    return(
        <div className="categories_page_container">
            <h1>{categoryDetails.name}</h1>
            <div className="sort_buttons">
                <h2>Sort by</h2>
                <div className="buttons">
                    <Button text={"Comments"} customClickEvent={()=>sortPosts("commNb")}/>
                    <Button text={"Likes"} customClickEvent={() => sortPosts("like_nb")}/>
                    <Button text={"Date"} customClickEvent={() => sortPosts("createdAt")}/>
                </div>

            </div>
            <div className="posts_container">
                {posts}
            </div>
                <a href={`/add/post/${category}`} className={"new_post_button"}>
                    <AddCircleIcon className={"icon"}/>
                </a>
        </div>
    )
}