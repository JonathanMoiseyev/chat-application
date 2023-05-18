import { useState } from "react";
import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import Chat from "./components/Chat/Chat";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

// Temp
import userDB from "./db/usersDB.js";

function App() {
    // const [user, setUser] = useState(null);
    let user = userDB['hemi'];
    let setUser = () => {};

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        user == null ? <Login /> : <Chat user={user} setUser={setUser} />
                    }
                />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
