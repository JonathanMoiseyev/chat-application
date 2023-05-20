import React from 'react';
import { useNavigate } from 'react-router-dom';
import ImgField from './ImgField.js';
import InputField from './InputField.js'; 
// import RememberMeButton from './RememberMeButton.js';
import Link from './Link.js';
import './Register.css';
import '../shared/PasswordInputField/PasswordInputField.js';
import PasswordInputField from '../shared/PasswordInputField/PasswordInputField.js';

import chatsDB from '../../db/chatsDB.js';
import userDB from '../../db/usersDB.js';

/**
 * Regitser function returns the register page.
 * which contains a form to register a new user, additionally
 * the register page contains a link to the login page.
 * The forum validates the user input and if the input is valid
 * its saves the user in the usersDB.
 * @returns {HTMLDivElement} The register page. 
 */
function Register() {
  const navigate = useNavigate();

  const [user, setUser] = React.useState({
    username: '',
    password: '',
    confirmPassword: '',
    img: '', 
    displayName: '',
  });

  const [error, setError] = React.useState('');

  /**
   * The function handles the change of the input fields.
   * Its updates the user state according to the input field.
   * @param {*} name 
   * @param {*} value 
   */
  const handleChange = (name, value) => {
    setUser({
      ...user,
      [name]: value,
    });
  }

  /**
   * The function validates the user input and if the input is valid
   * its saves the user in the usersDB and navigates to the login page. 
   * @param {*} event 
   */
  const validateAndSubmit= (event) => {
    event.preventDefault();
    let error = '';

    if (!user.username) {
      error = 'Username is required';
    } else if (!user.password) {
      error = 'Password is required';
    } else if (!/\d/.test(user.password)) {
      error = 'Password must contain at least one number';
    } else if (!/[a-zA-Z]/.test(user.password)) {
      error = 'Password must contain at least one letter';
    } else if (user.password.length < 8) {
      error = 'Password must be at least 8 characters';
    } else if (!user.confirmPassword) {
      error = 'Confirm password is required';
    } else if (user.password !== user.confirmPassword) {
      error = 'Confirm password is not match';
    } else if (!user.displayName) {
      error = 'Display name is required';
    } else if (!user.img) {
      error = 'Picture is required';
    } else if (userDB[user.username]) {
      error = 'Username is already taken';
    } else {
      handleSubmit();
    }

    setError(error);
  }

  const handleSubmit = () => {
    delete user.confirmPassword;

    userDB[user.username] = {
      ...user,
      contacts : [],
    };

    chatsDB[user.username] = {};

    navigate('/');
  }


  const updatueUserConfirmPassword = (value) => {
    user.confirmPassword = value;
  }

  const updatueUserPassword = (value) => {
    user.password = value;
  }


  return (
    <div className="p-5">
      <main className="container register-container w-30 p-5 mt-5 shadow bg-white">
        <div className="row">
          <div className="col col-12">
            <div className="border-0 card">
              <div className="card-body">
                {/*Title*/}
                <div className="h3 mb-5">Create your account</div>

                  {/*Signup form*/}
                  <form>
                    {/*Username input*/}
                    <InputField text="username" name="username" type="text"
                        id="register-username" value={user.username}
                        handleChange={({ target }) => {
                        handleChange(target.name, target.value);
                        }}
                    />

                    {/*Password input*/}
                    <PasswordInputField 
                        labelOfInputField="password"
                        idOfInputField="register-passwd"
                        updateFunction={updatueUserPassword}
                    />

                    {/*Confirm password input*/}
                    <PasswordInputField 
                        labelOfInputField="confirm password"
                        idOfInputField="register-confirm-passwd"
                        updateFunction={updatueUserConfirmPassword}
                    />

                    {/*Display name*/}
                    <InputField text="display name" name="displayName" type="text"
                        id="register-display-name" value={user.displayName}
                        handleChange={({ target }) => {
                        handleChange(target.name, target.value);
                        }}
                    />

                    {/*Picture*/}
                    <ImgField name="img" id="register-picture"
                        text = "picture" value={user.picture} 
                        handleChange={(value) => {
                        handleChange('img', value);
                        }} 
                    />

                    {/*Remember me*/}
                    {/* <RememberMeButton id="register-remember-me" /> */}

                    {/*Submit and redirection to sign in*/}
                    <div className="d-flex flex-column">
                        <p className="error-message bold mx-auto mb-3">{error}</p>

                        <button type="submit" onClick={validateAndSubmit} className="btn bg-light-purple darken-on-hover w-100 text-white fw-600 py-2 mb-4">
                        Register
                        </button>

                        <div className="mx-auto">
                        <Link initialText="Already have an account?&nbsp;" linkText="Sign in" link="/" />
                        </div>
                    </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Register;
