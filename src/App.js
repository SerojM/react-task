import React from 'react';
import './assets/styles/style.scss';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home";

function App() {

    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route index path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}


export default App;
