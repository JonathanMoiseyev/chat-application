/** @format */

import "./login.css";

import InputField from "./../shared/InputField";
import SubmitFormButton from "./SubmitFormButton";
import { useState } from "react";

import PasswordInputField from "../shared/PasswordInputField/PasswordInputField";
import Link from "../shared/Link.js";
import { fetchToken } from "../shared/api.js";

function LoginCard({ setUserByToken }) {
    let [input, setInput] = useState({ username: "", password: "" });
    let [inputErrorMessage, setInputErrorMessage] = useState("");

    const signInFunction = async (event) => {
        event.preventDefault();
        let token = await fetchToken(input);
        if (token === null) {
            setInputErrorMessage("Wrong username or password");
        } else {
            setUserByToken(token, input.username);
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

                    <div className="d-flex flex-column">
                        {/* Error message */}
                        <span className="error-message bold mx-auto mb-3">{inputErrorMessage}</span>

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
