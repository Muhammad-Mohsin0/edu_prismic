import React from 'react';
import Navbar from './components/Navbar'; // Adjust the path as necessary
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeOne from './components/Home/HomeOne';


const App = () => {
    return (
        <>
        <Navbar />
        <HomeOne/>
        </>
    );
};

export default App;