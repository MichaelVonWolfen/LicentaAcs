import React from "react";
import "./navbar.css"
export default class Navbar extends React.Component{
    isLoggedIn;
    constructor(props) {
        super(props);
        this.isLoggedIn = localStorage.length >= 1
        console.log(this.isLoggedIn)
    }
    render() {
        return(
            <nav>
                <a href="/" className={"Logo"}>Split</a>
                <span className={"search_span span"}>
                    <input type="text" placeholder="Search" className="search_bar"/>
                </span>
                <span className={"links span"}>
                    <a href="/">Home</a>
                    {!this.isLoggedIn ? (
                    <span className={"span"}>
                        <a href="/login">Log In</a>
                        <a href="/register">Register</a>
                    </span>
                    ):(
                        <a href="#" className={"position_right"}>Log Out</a>
                    )}
                </span>
            </nav>
        )
    }
}