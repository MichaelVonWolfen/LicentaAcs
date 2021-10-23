import React from "react";
import "./login.css"
import Button from "../button/button";
import CustomInput from "../inputs/inputs";
import getCategoryDetailAndSetColors from "../helpers/setColors";
export default function Login(props){
    // const categoryDetails = getCategoryDetailAndSetColors(props.match.params.category)
    document.body.style =`--background-color: #252422;--color: #CCC5B9;`
    const input = (e)=>{
        let value = e.target.value
        const label = document.querySelector(`#${e.target.name}`)
        if(value){
            label.classList.add("input_has_contents")
            console.log(label.classList)
        }else{
            label.classList.remove("input_has_contents")
        }
    }
    return(
        <div className="login_container">
            <h1>Login</h1>
            <form action="/" method="post" className="login">
                <label htmlFor={"email"} className="login_input" placeholderText={"Email"} id="email" >
                    <input type="text" name="email" className={"email"} required={true} onInput={input}/>
                </label>
                <label htmlFor={"password"} className="login_input" placeholderText={"Password"} id="password">
                    <input type="password" name="password" className="password"  required={true} onInput={input}/>
                </label>
                <div className="button_logIN">
                    <Button text={"Log In"} customClickEvent={""} additionalClasses={"loginButton"}/>
                </div>
            </form>
                <p>Don't have a Split account?</p>
                <a href="/register">Create one today!</a>
        </div>
    )
}