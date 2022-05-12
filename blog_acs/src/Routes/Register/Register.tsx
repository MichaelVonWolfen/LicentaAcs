import React from "react";
import Button from "../../Components/Button/button";
import CustomInputs from "../../Components/inputs/Inputs"
import EInput from "../../Structures/EnumInput";
import constants from "../../Config/constants";

export default function Register (){
    document.body.setAttribute("style",`--background-color: #252422;--color: #CCC5B9;`)
    const input = (e:any)=>{
        let value = e.target.value
        const label = document.querySelector(`#${e.target.name}Label`)
        if(!label) return
        if(value){
            label.classList.add("input_has_contents")
        }else{
            label.classList.remove("input_has_contents")
        }
    }
    const formSubmit = (e:any) =>{
        e.preventDefault()
        console.log(e)
        // if(e.target.password.value !== e.target.confirmPassword.value){
        //     alert("Passwords must be the same")
        //     return
        // }
        let data = new FormData(e.target)
        for (let entry of data.entries()) {
            console.log(entry)
        }
        fetch(`${constants.BACKEND_URL}/api/auth/register`,{
            method: "POST",
            body: data
        }).then(result =>{
            if(result.status < 400)
                window.location.href = "/login"
            else{
                result.text().then(r => alert(r))
            }
        }).catch(err =>{
            console.log(err)
            alert(err)
        })
    }
    return(
        <div className="login_container">
            <h1>Register</h1>
            <form action="/" method="post" onSubmit={formSubmit}>
                <CustomInputs type={EInput.file} placeholder={""} name={"profile_picture"} additionalClasses = ""/>
                <div className="login">
                    {/* @ts-ignore*/}
                    <label htmlFor={"username"} className="login_input" placeholdertext={"Username"} id="usernameLabel">
                        <input type="text" name="username" className={"username"} required={true} onInput={input} id="username" />
                    </label>
                    {/* @ts-ignore*/}
                    <label htmlFor={"email"} className="login_input" placeholdertext={"Email"} id="emailLabel">
                        <input type="text" name="email" className={"email"} required={true} onInput={input} id="email"/>
                    </label>
                    {/* @ts-ignore*/}
                    <label htmlFor={"password"} className="login_input" placeholdertext={"Password"} id="passwordLabel">
                        <input type="password" name="password" className="password"  required={true} onInput={input} id="password"/>
                    </label>
                    {/* @ts-ignore*/}
                    <label htmlFor={"confirmPassword"} className="login_input" placeholdertext={"Confirm Password"} id="confirmationPasswordLabel">
                        <input type="password" name="confirmationPassword" className="confirmationPassword"  required={true} onInput={input} id="confirmationPassword"/>
                    </label>
                    <div className="button_logIN">
                        <Button text={"Register"} additionalClasses={"loginButton"}/>
                    </div>
                </div>
            </form>
            <p>Already have a Split account?</p>
            <a href="/login">Login and start exploring!</a>
        </div>
    )
}