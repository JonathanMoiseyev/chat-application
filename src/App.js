import { React, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./components/Chat/Chat";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

function App() {
    // const [user, setUser] = useState(null);
    let user = 'Hemi'

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/chat" element={<Chat user={user} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
