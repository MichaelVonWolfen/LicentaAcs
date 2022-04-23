import React from "react";
import "./login.sass"
import Button from "../../Components/Button/button";
import axios from "axios";
import constants from "../../Config/constants";
export default function Login(){
    document.body.setAttribute("style",`--background-color: #252422;--color: #CCC5B9;`)
    const input = (e:any)=>{
        let value = e.target.value
        const label = document.querySelector(`#${e.target.name}Label`)
        if(!label) return;
        if(value){
            label.classList.add("input_has_contents")
        }else{
            label.classList.remove("input_has_contents")
        }
    }
    const handleLogin = (e:any) =>{
        e.preventDefault()
        console.log(e)
        let data ={
            email: e.target.email.value,
            password: e.target.password.value,
        }
        axios.post(`${constants.BACKEND_URL}/api/auth/login`,data).then(result =>{
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
                {/* @ts-ignore */}
                <label htmlFor={"email"} className="login_input" placeholderText={"Email"} id="emailLabel" >
                    <input type="text" name="email" className={"email"} required={true} onInput={input} id="email" />
                </label>
                {/* @ts-ignore */}
                <label htmlFor={"password"} className="login_input" placeholderText={"Password"} id="passwordLabel">
                    <input type="password" name="password" className="password"  required={true} onInput={input} id="password" />
                </label>
                <div className="button_logIN">
                    {/* @ts-ignore */}
                    <Button text={"Log In"} customClickEvent={""} additionalClasses={"loginButton"}/>
                </div>
            </form>
            <p>Don't have a Split account?</p>
            <a href="/register">Create one today!</a>
        </div>
    )
}