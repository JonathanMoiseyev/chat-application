
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Chat from "./components/Chat/Chat";
import Login from './components/Login/Login';
import Register from "./components/Register/Register";
import contacts from "./db/contacs";


function App() {
    const props = { contacts: contacts };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/chat" element={<Chat {...props} />} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />                

            </Routes>
        </BrowserRouter>
    );
}

export default App;
