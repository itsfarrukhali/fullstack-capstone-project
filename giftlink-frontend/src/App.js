/*jshint esversion: 8 */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import SearchPage from './components/SearchPage/SearchPage';
import DetailsPage from './components/DetailsPage/DetailsPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/LoginPage';
import Profile from './components/Profile/Profile'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar/Navbar';

function App() {

  return (
    <>
        <Navbar/>
        <Routes>
        {/* Main Page Routes */}
        <Route path="/" element={<MainPage />} />
        <Route path="/app" element={<MainPage />} />
        <Route path="/app/product/:productId" element={<DetailsPage/>} />
        <Route path="/app/search" element={<SearchPage/>} />
        <Route path="/app/profile" element={<Profile />} />
        
        {/* Register and Login Routes */}
        <Route path="/app/register" element={<RegisterPage />} />
        <Route path="/app/login" element={<LoginPage />} />
      </Routes>

        </>
  );
}

export default App;
