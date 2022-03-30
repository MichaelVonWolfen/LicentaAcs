import React from "react";
import "./navbar.sass"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import logo from "../../../public/Images/logo.svg"

export default function Navbar(){
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
    return(
        <nav>
            <a href="/" className={"logo"}><img src={logo} alt="logo"/></a>
            <span className={"search_container"}>
                <input type="text" placeholder="Search" className="search_bar"/>
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