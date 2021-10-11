import React from "react";

export default class Register extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <form action="/" method="post" className="login">
                <label htmlFor="username">username</label>
                <input type="text" name={"username"} placeholder="username"/>
                <label htmlFor="email">Email</label>
                <input type="text" name={"email"} placeholder="email"/>
                <label htmlFor="password">Password</label>
                <input type="password" name={"password"} placeholder="Password"/>
                <label htmlFor="confirm">confirm password</label>
                <input type="password" name={"confirm"} placeholder="confirm password"/>
                <button type="submit">Register</button>
            </form>
        )
    }
}