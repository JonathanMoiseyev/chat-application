import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from './components/Chat/Chat';
import Login from './components/Login/Login';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chat" element={<Chat/>} />
        <Route path="/login" element={<Login/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
