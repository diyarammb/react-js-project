import './App.css';
import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import About from './pages/about';
import Auth from './pages/auth';
import Dashboard from './pages/dashboard';
function App() {
  return (
    <>
    <Header />
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/auth" element={<Auth/>}/>
          <Route exact path="/dashboard" element={<Dashboard/>}/>
        </Routes>
    <Footer />
    </>
  );
}

export default App;
