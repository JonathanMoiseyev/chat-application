/** @format */

import "./login.css";

import InputField from "./../shared/InputField";
import SubmitFormButton from "./SubmitFormButton";
import { useState } from "react";

import PasswordInputField from "../shared/PasswordInputField/PasswordInputField";
import Link from "../shared/Link.js";

function LoginCard({ setToken }) {
    let [input, setInput] = useState({ username: "", password: "" });
    let [inputErrorMessage, setInputErrorMessage] = useState("");

    const signInFunction = async (event) => {
        event.preventDefault();

        let res = await fetch("http://localhost:5000/api/Tokens", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(input),
        });

        if (res["status"] === 200) {
            const reader = res.body.getReader();
            let encodedResult = await reader.read();
            let result = new TextDecoder("utf-8").decode(encodedResult.value);
            setToken(result);
        } else if (res["status"] === 401) {
            setInputErrorMessage("Wrong username and/or password");
        }
    };

    const handleChange = (name, value) => {
        setInput({
            ...input,
            [name]: value,
        });
    };

    const setInputUsername = (value) => {
        handleChange("username", value);
    };

    const setInputPassword = (value) => {
        handleChange("password", value);
    };

    return (
        <div className="border-0 card">
            <div className="card-body">
                {/* Title */}
                <div className="h3 mb-5">Sign in to your account</div>

                {/* Login form */}
                <form>
                    {/* Username input */}
                    <InputField
                        labelOfInputField="Username"
                        idOfInputField="login-username"
                        updateFunction={setInputUsername}
                        inputType="text"
                    />

                    {/* Password input */}
                    <PasswordInputField
                        labelOfInputField="Password"
                        idOfInputField="login-passwd"
                        updateFunction={setInputPassword}
                    />

                    {/* Error message */}
                    <span className="error-message">{inputErrorMessage}</span>

                    <div className="d-flex flex-column">
                        {/* Submit button */}
                        <SubmitFormButton writingOnButton="Continue" signInFunction={signInFunction} />

                        {/* redirection to sign up */}
                        <div className="mx-auto">
                            <Link initialText="Don't have an account?&nbsp;" linkText="Sign up" link="/register" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginCard;
