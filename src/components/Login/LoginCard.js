import './login.css';

import InputField from './InputField';
import SubmitFormButton from './SubmitFormButton';
import HrefLink from './HrefLink';
import {useState} from "react";
import usersDB from "../../db/usersDB";




function LoginCard({setUser}) {
    let [inputUsername, setInputUsername] = useState("")
    let [inputPassword, setInputPassword] = useState("")

    let[inputErrorMessage, setInputErrorMessage] = useState("")


    const signInFunction = (event) => {
        event.preventDefault();
        if (usersDB[inputUsername] != undefined) {
            if (usersDB[inputUsername].password == inputPassword) {
                setUser(usersDB[inputUsername]);
                return
            }
        }

        setInputErrorMessage("Wrong username and/or password")
    }



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
                    <InputField 
                        labelOfInputField="Password"
                        idOfInputField="login-passwd"
                        updateFunction={setInputPassword}
                        inputType="password"

                        additionalWritingAfterLabel="Forgot Password?"
                    />


                    {/* Error message */}
                    <span className="error-message">{inputErrorMessage}</span>


                    
                    <div className="d-flex flex-column">
                        {/* Submit button */}
                        <SubmitFormButton
                            writingOnButton="Continue"
                            signInFunction={signInFunction}
                        />
                        
                        {/* redirection to sign up */}
                        <HrefLink
                            textBeforeLink="Don't have an account?"
                            textInLink="Sign up"
                            whereToLink="/register"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginCard;