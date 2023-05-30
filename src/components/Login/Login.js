/** @format */

import LoginCard from "./LoginCard";

function Login({ setToken }) {
    return (
        <main className="container login-container w-30 p-5 mt-5 shadow bg-white">
            <div className="row">
                <div className="col col-12">
                    <LoginCard setToken={setToken} />
                </div>
            </div>
        </main>
    );
}

export default Login;
