/** @format */

import LoginCard from "./LoginCard";

function Login({ setUserByToken }) {
    return (
        <main className="container login-container w-30 p-5 mt-5 shadow bg-white">
            <div className="row">
                <div className="col col-12">
                    <LoginCard setUserByToken={setUserByToken} />
                </div>
            </div>
        </main>
    );
}

export default Login;
