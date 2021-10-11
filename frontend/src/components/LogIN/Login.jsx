import React from "react";
import "./login.css"
export default class Login extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <form action="/" method="post" className="login">
                <label htmlFor="email">Email</label>
                <input type="text" name={"email"} placeholder="email"/>
                <label htmlFor="password">Password</label>
                <input type="password" name={"password"} placeholder="Password"/>
                <button type="submit">log in</button>
            </form>
        )
    }
}