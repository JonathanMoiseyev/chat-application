import React from 'react';
import './Register.css';
import './global.css'

function Register() {
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
                  <div className="fw-600 mb-4">
                    <label htmlFor="register-username" className="form-label">
                      Username
                    </label>
                    <input type="text" className="form-control" id="register-username" />
                  </div>

                  {/*Password input*/}
                  <div className="fw-600 mb-4">
                    <label htmlFor="register-passwd" className="form-label">
                      Password
                    </label>
                    <input type="password" className="form-control" id="register-passwd" />
                  </div>

                  {/*Confirm password input*/}
                  <div className="fw-600 mb-4">
                    <label htmlFor="register-confirm-passwd" className="form-label">
                      Confirm password
                    </label>
                    <input type="password" className="form-control" id="register-confirm-passwd" />
                  </div>

                  {/*Display name*/}
                  <div className="fw-600 mb-4">
                    <label htmlFor="register-display-name" className="form-label">
                      Display name
                    </label>
                    <input type="text" className="form-control" id="register-display-name" />
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
