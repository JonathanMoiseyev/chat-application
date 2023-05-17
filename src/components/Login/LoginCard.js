import './login.css';
import './global.css';

import InputField from './InputField';
import CheckboxField from './CheckboxField';
import SubmitFormButton from './SubmitFormButton';
import HrefLink from './HrefLink';

function LoginCard() {
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
                    />

                    {/* Password input */}
                    <InputField 
                        labelOfInputField="Password"
                        idOfInputField="login-passwd"
                        additionalWritingAfterLabel="Forgot Password?"
                    />
                    
                    {/* Remember me */}
                    <CheckboxField 
                        tytleOfCheckboxField="Remember me"
                        idOfCheckboxField="login-remember-me"
                    />
                    


                    
                    <div className="d-flex flex-column">
                        {/* Submit button */}
                        <SubmitFormButton writingOnButton="Continue"/>
                        
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