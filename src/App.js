import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./components/Chat/Chat";
import Login from './components/Login/Login';
import Register from "./components/Register/Register";
import userDetails from "./db/userDetails";
import contacts from "./db/contacs";
import messages from "./db/messages";


function App() {
    const props = { contacts: contacts, userDetails: userDetails, messages: messages };

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
