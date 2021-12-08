import React from "react";
import Button from "../button/button";
import CustomInputs from "../inputs/inputs"
import axios from "axios";
export default function (props){
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
    const formSubmit = (e) =>{
        e.preventDefault()
        console.log(e)
        if(e.target.password.value !== e.target.confirmPassword.value){
            console.log("Passwords must be the same")
            return
        }
        let user ={
            image:e.target.image,
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
            confirmationPassword: e.target.confirmPassword.value
        }
        axios.post("/api/auth/register",user).then(result =>{
            alert(result.data.title)
            window.location.href = "/login"
        }).catch(err =>{
            console.log("ERROR IN BE")
            console.log(err)
            alert(err)
        })
    }
    return(
        <div className="login_container">
            <h1>Register</h1>
            <form action="/" method="post" onSubmit={formSubmit}>
                <CustomInputs type={"file"} name={"profile picture"} additionalClasses = ""/>
                <div className="login">
                    <label htmlFor={"username"} className="login_input" placeholderText={"Username"} id="username" >
                        <input type="text" name="username" className={"username"} required={true} onInput={input}/>
                    </label>
                    <label htmlFor={"email"} className="login_input" placeholderText={"Email"} id="email" >
                        <input type="text" name="email" className={"email"} required={true} onInput={input}/>
                    </label>
                    <label htmlFor={"password"} className="login_input" placeholderText={"Password"} id="password">
                        <input type="password" name="password" className="password"  required={true} onInput={input}/>
                    </label>
                    <label htmlFor={"confirmPassword"} className="login_input" placeholderText={"Confirm Password"} id="confirmPassword">
                        <input type="password" name="confirmPassword" className="confirmPassword"  required={true} onInput={input}/>
                    </label>
                    <div className="button_logIN">
                        <Button text={"Register"} customClickEvent={""} additionalClasses={"loginButton"}/>
                    </div>
                </div>
            </form>
            <p>Already have a Split account?</p>
            <a href="/login">Login and start exploring!</a>
        </div>
    )
}