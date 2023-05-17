
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Chat from "./components/Chat/Chat";
import contacts from "./db/contacs";
import Login from './components/Login/Login';

function App() {
    const props = { contacts: contacts };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/chat" element={<Chat {...props} />} />
                <Route path="/login" element={<Login/>} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
