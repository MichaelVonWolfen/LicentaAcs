import React, {ReactElement, useEffect, useState} from "react";
import Button from "../../Components/Button/button"
import Post from "../../Components/post/post";
import "./category-page.sass"
import getCategoryDetailAndSetColors from "../../Helpers/setColors";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from "axios";
import {useParams} from "react-router-dom";
import {Icategory, Ipost, ICategoryData} from "../../Structures/InterfacesCategoryPage"

export default function CategoryPage() {
    const {category} = useParams()
    const initData:ICategoryData ={category:{_id:""}, name: "",postsList:[]}
    const [categoryDetails, setCategoryDetails] = useState(initData)
    const [categoryData, setCategoryData] = useState(initData)
    const [posts, setPosts] = useState([<Post title="" postID="" state="" category="" image="" commNb={0} key="" date="" likeNb={0}/>])

    const sortPosts = (sorter:string, order:string[], callback:Function)=>{
        // console.log(sorter)
        axios.get(`/api/categories/${category}`,{
            params:{
                sort: {
                    sortBy: sorter,
                    value   : order
                }
            }
        }).then(r =>{
            let data = r.data
            // console.log("data")
            // console.log(data)
            setCategoryData(data);
        }).catch(e =>{
            console.log(e)
        })
        callback()
    };
    useEffect(()=>{
        axios.get(`/api/categories/${category}`,).then(r =>{
            let data = r.data
            // console.log(data)
            setCategoryData(data);
        }).catch(e =>{
            console.log(e)
        })
    },  [])
    useEffect(()=>{
        if(categoryData === initData) return
        const {category, postsList} = categoryData
        if(category){
            setCategoryDetails(getCategoryDetailAndSetColors(category))
        }
        let allPosts: ReactElement[] = []
        if(postsList){
            postsList.forEach(postElement =>{
                // console.log(postElement)
                let post = <Post
                    title={postElement.title}
                    category = {category._id}
                    image={postElement.post_img}
                    date={new Date(postElement.createdAt).toLocaleDateString('ro', { year:"numeric", month:"short", day:"numeric"})}
                    likeNb={postElement.like_nb} commNb={postElement.commNb}
                    key={postElement._id} postID={postElement._id}
                    state={Math.random() > 0.5? "saved":"not_saved"}/>
                allPosts.push(post)
            })
            setPosts(allPosts)
        }
    }, [categoryData])
    return(
        <div className="categories_page_container">
            <h1>{categoryDetails.name}</h1>
            <div className="sort_buttons">
                <h2>Sort by</h2>
                <div className="buttons">
                    <Button text={"Comments"} customClickEvent={(order:any,callback:any)=>sortPosts("commNb",order, callback)}/>
                    <Button text={"Likes"} customClickEvent={(order:any,callback:any) => sortPosts("like_nb",order, callback)}/>
                    <Button text={"Date"} customClickEvent={(order:any,callback:any) => sortPosts("createdAt",order, callback)}/>
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