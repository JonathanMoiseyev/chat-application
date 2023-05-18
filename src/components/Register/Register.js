import React from 'react';
import './Register.css';
import userDetails from '../../db/usersDB.js';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField.js'; 
import RememberMeButton from './RememberMeButton.js';
import Link from './Link.js';

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = React.useState({
    username: '',
    password: '',
    confirmPassword: '',
    displayName: '',
  });

  const [error, setError] = React.useState('');

  const handleChange = (name, value) => {
    setUser({
      ...user,
      [name]: value.trim(),
    });
  }

  const validate = (event) => {
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
    } else if (!user.confirmPassword) {
      error = 'Confirm password is required';
    } else if (user.password !== user.confirmPassword) {
      error = 'Confirm password is not match';
    } else if (!user.displayName) {
      error = 'Display name is required';
    } else {
      handleSubmit();
    }

    setError(error);
  }

  const handleSubmit = () => {
    userDetails.username = user.username;
    userDetails.password = user.password;
    userDetails.displayName = user.displayName;
    userDetails.img = user.img;

    navigate('/login');
  }

  return (
    <div className="p-5">
      <main className="container w-30 p-5 mt-5 shadow bg-white">
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
                  <InputField text="password" name="password" type="password"
                    id="register-passwd" value={user.password}
                    handleChange={({ target }) => {
                      handleChange(target.name, target.value);
                    }}
                  />

                  {/*Confirm password input*/}
                  <InputField text="confirm password" name="confirmPassword" type="password"
                    id="register-confirm-passwd" value={user.confirmPassword}
                    handleChange={({ target }) => {
                      handleChange(target.name, target.value);
                    }}
                  />

                  {/*Display name*/}
                  <InputField text="display name" name="displayName" type="text"
                    id="register-display-name" value={user.displayName}
                    handleChange={({ target }) => {
                      handleChange(target.name, target.value);
                    }}
                  />

                  {/*Picture*/}
                  <InputField text="picture" name="picture" type="file"
                    id="register-picture" value={user.picture}
                    handleChange={({ target }) => {
                      handleChange(target.name, target.value);
                    }}
                  />

                  {/*Remember me*/}
                  <RememberMeButton id="register-remember-me" />

                  {/*Submit and redirection to sign in*/}
                  <div className="d-flex flex-column">
                    <p className="error-message bold mx-auto mb-3">{error}</p>

                    <button type="submit" onClick={validate} className="btn bg-light-purple darken-on-hover w-100 text-white fw-600 py-2 mb-4">
                      Register
                    </button>

                    <div className="mx-auto">
                      <Link initialText="Already have an account?&nbsp;" linkText="Sign in" link="/login" />
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
