import React from 'react';
import './Register.css';
import './global.css'

function Register() {
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
    }

    setError(error);
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
                <form onSubmit={validate}>
                  {/*Username input*/}
                  <div className="fw-600 mb-4">
                    <label htmlFor="register-username" className="form-label">
                      Username
                    </label>
                    <input type="text" name="username"
                      className="form-control input"
                      id="register-username"  value={user.username}
                      onChange={({ target }) => {
                        handleChange(target.name, target.value);
                      }}
                    />
                    {/* <p className="error-message">{error.username}</p> */}
                  </div>

                  {/*Password input*/}
                  <div className="fw-600 mb-4">
                    <label htmlFor="register-passwd" className="form-label">
                      Password
                    </label>
                    <input type="password" name="password" value={user.password}
                      className="form-control input" id="register-passwd"
                      onChange={({ target }) => {
                        handleChange(target.name, target.value);
                      }}
                    />
                    {/* <p className="error-message">{error.password}</p> */}
                  </div>

                  {/*Confirm password input*/}
                  <div className="fw-600 mb-4">
                    <label htmlFor="register-confirm-passwd" className="form-label">
                      Confirm password
                    </label>
                    <input type="password" name="confirmPassword"
                      className="form-control input" value={user.confirmPassword}
                      id="register-confirm-passwd" 
                      onChange={({ target }) => {
                        handleChange(target.name, target.value);
                      }}
                    />
                    {/* <p className="error-message">{error.confirmPassword}</p> */}
                  </div>

                  {/*Display name*/}
                  <div className="fw-600 mb-4">
                    <label htmlFor="register-display-name" className="form-label">
                      Display name
                    </label>
                    <input type="text" className="form-control"
                      id="register-display-name" name="displayName"
                      value={user.displayName}
                      onChange={({ target }) => {
                        handleChange(target.name, target.value);
                      }}
                    />
                  </div>

                  {/*Picture*/}
                  <div className="fw-600 mb-4">
                    <label htmlFor="register-picture" className="form-label">
                      Picture
                    </label>
                    <input type="file" className="form-control" id="register-picture" accept="image/*" />
                  </div>

                  {/*Remember me*/}
                  <div className="form-check fw-600 mb-4">
                    <input type="checkbox" className="form-check-input" id="register-remember-me" />
                    <label className="form-check-label small" htmlFor="register-remember-me">
                      Remember me
                    </label>
                  </div>

                  {/*Submit and redirection to sign in*/}
                  <div className="d-flex flex-column">
                    <p className="error-message bold mx-auto mb-3">{error}</p>

                    <button type="submit" className="btn bg-light-purple darken-on-hover w-100 text-white fw-600 py-2 mb-4">
                      Register
                    </button>

                    <div className="mx-auto">
                      <span>Already have an account?&nbsp;</span>
                      <a className="text-decoration-none darken-on-hover light-purple fw-600" href="login.html">
                        Sign In
                      </a>
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
