import React, {FormEventHandler, useState} from "react";
import "./navbar.sass"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import logo from "../../Assets/Images/logo.svg"
import constants from "../../Config/constants";

interface ISearchResponse{
    categories:[{
        id:string,
        image:string,
        name:string
    }],
    posts:[{
        _id:string
        categoryID:string,
        post_img:string,
        title:string
    }]
}
export default function Navbar(){
    const [searchResults, setSearchResults] = useState([<a></a>])
    const isLoggedIn = localStorage.length >= 1
    const changeSidebarState = () => {
        let sidebar = document.querySelector("#sidebar_menu")
        if(!sidebar) return
        if (sidebar.classList.contains("sidebar_hidden"))
            sidebar.classList.remove("sidebar_hidden")
        else
            sidebar.classList.add("sidebar_hidden")
    };
    const handleLogout = ()=>{
        localStorage.removeItem("token")
        window.location.href = "/"
    }
    const handleFocusChange = (action:"blur"|"focus") =>{
        // const search = document.getElementById("search_input") as HTMLInputElement
        // const searchList = document.getElementById("search_results")
        // console.log(document.activeElement)
        // if (!searchList || ! search) return
        // if(action === "blur") searchList.classList.add("hidden")
        // if(action === "focus" && search.value.length > 0) searchList.classList.remove("hidden")
    }
    const handleInput = (e:any) =>{
        const search = e.target as HTMLInputElement
        const searchList = document.getElementById("search_results")
        if (!searchList) return
        if(search.value.length > 0)
            searchList.classList.remove("hidden")
        else
            searchList.classList.add("hidden")
        console.log(search.classList)
        fetch(`${constants.BACKEND_URL}/api/search?query=${search.value}`,{
            method: "GET"
        }).then(r =>{
            r.json().then((response:ISearchResponse) =>{
                const {categories, posts} = response
                const dataList: JSX.Element[] = []
                categories.forEach(category =>{
                    {/*@ts-ignore*/}
                    dataList.push(<a href={`/category/${category.id}`} className="result" style={{"--url":`url(${constants.BACKEND_URL}/${category.image})`}} itemType={"Category"} key={category.id}><span>{category.name}</span></a>)
                })
                posts.forEach(post =>{
                    {/*@ts-ignore*/}
                    dataList.push(<a href={`/category/${post.categoryID}/post/${post._id}`} className="result" style={{"--url":`url(${constants.BACKEND_URL}/${post.post_img})`}} itemType={"Post"} key={post._id}><span>{post.title}</span></a>)
                })
                if (dataList.length === 0)
                    dataList.push(<a className="result" itemType={"None"}><span>No results!</span></a>)
                setSearchResults(dataList)
            })
        })
    }
    return(
        <nav>
            <a href="/" className={"logo"}><img src={logo} alt="logo" loading={"lazy"}/></a>
            <span className={"search_container"} onBlur={()=>{handleFocusChange("blur")}} onFocus={() =>{handleFocusChange("focus")}}>
                <input type="text" placeholder="Search" className="search_bar" onInput={handleInput} id={"search_input"}/>
                <div className="search_results hidden" id={"search_results"}>
                    {searchResults}
                </div>
            </span>
            <span className={"links"}>
                <a className={"nav_link"} href="/">Home</a>
                {!isLoggedIn ? (
                <span className={"span"}>
                    <a className={"nav_link"} href="/login">Log In</a>
                    <a className={"nav_link"} href="/register">Register</a>
                </span>
                ):(
                    <a className={"nav_link"} onClick={handleLogout}>Log Out</a>
                )}
            </span>
            <span className={"links hamburger"} onClick={changeSidebarState}>
                <div className="bars"/>
            </span>
            <span className={"hamburger_links sidebar_hidden"}  id={"sidebar_menu"}>
                <a className={"nav_link"} href="#" onClick={changeSidebarState}><ArrowBackIcon className={"svg_icon"}/> Back</a>
                <a className={"nav_link"} href="/"><HomeIcon className={"svg_icon"}/> Home</a>
                {!isLoggedIn ? (
                    <span className={"span"}>
                    <a className={"nav_link"} href="/login"><LoginIcon className={"svg_icon"}/> Log In</a>
                    <a className={"nav_link"} href="/register"><PersonAddIcon className={"svg_icon"}/> Register</a>
                </span>
                ):(
                    <a className={"nav_link"} onClick={handleLogout}><LogoutIcon className={"svg_icon"}/>Log Out</a>
                )}
            </span>
        </nav>
    )
}