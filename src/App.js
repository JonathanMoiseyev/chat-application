import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./components/Chat/Chat";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

function App() {
    const [user, setUser] = useState(null);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        user == null ? <Login setUser={setUser}/> : <Chat user={user} setUser={setUser} />
                    }
                />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
