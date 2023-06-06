/** @format */

import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./components/Chat/Chat";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { fetchUser, fetchContacts } from "./components/shared/api";
import { defaultUser } from "./components/shared/userApi";

function App() {
    const [user, setUser] = useState(defaultUser());

    const setUserByToken = async (token, username) => {
        let user = await fetchUser(token, username);
        let contacts = await fetchContacts(token);
        setUser({
            username: username,
            profilePic: user.profilePic,
            displayName: user.displayName,
            token: token,
            contacts: contacts,
        });
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        user.token === "" ? (
                            <Login setUserByToken={setUserByToken} setUser={setUser} />
                        ) : (
                            <Chat user={user} setUser={setUser} />
                        )
                    }
                />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
