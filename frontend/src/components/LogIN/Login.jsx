import React from "react";
import "./login.css"
import Button from "../button/button";
import CustomInput from "../inputs/inputs";
import getCategoryDetailAndSetColors from "../helpers/setColors";
import axios from "axios";
export default function Login(props){
    // const categoryDetails = getCategoryDetailAndSetColors(props.match.params.category)
    document.body.style =`--background-color: #252422;--color: #CCC5B9;`
    const input = (e)=>{
        let value = e.target.value
        const label = document.querySelector(`#${e.target.name}`)
        if(value){
            label.classList.add("input_has_contents")
        }else{
            label.classList.remove("input_has_contents")
        }
    }
    const handleLogin = (e) =>{
        e.preventDefault()
        console.log(e)
        let data ={
            email: e.target.email.value,
            password: e.target.password.value,
        }
        axios.post("/api/auth/login",data).then(result =>{
            // console.log(result)
            localStorage.setItem("token", `Bearer ${result.data}`)
            window.location.href = "/"
        }).catch(err =>{
            console.log("ERROR IN BE")
            console.log(err)
            alert(err)
        })
    }
    return(
        <div className="login_container">
            <h1>Login</h1>
            <form action="/" method="post" className="login" onSubmit={handleLogin}>
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