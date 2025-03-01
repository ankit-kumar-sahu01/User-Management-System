import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import AddUser from './component/AddUser';
import ListUser from './component/ListUser';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/list-user" element={<ListUser />} />
        </Routes>
    );
}

export default App;