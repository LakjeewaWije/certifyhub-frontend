import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PrivateRoute from './PrivateRoute';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './login';

function App() {
  const isLoggedIn = localStorage.getItem('jwtToken') ? true : false;

  const wrapPrivateRoute = (element: any, isLoggedIn: boolean) => {
    return (
      <PrivateRoute isLoggedIn={isLoggedIn}>
        {element}
      </PrivateRoute>
    );
  };
  return (
    <Router>
      <Routes>
        <Route path="/*" element={wrapPrivateRoute(<Home />, isLoggedIn)} />
        <Route path="/login/*" element={isLoggedIn ? <Navigate to="/home" /> : <Login />} />
        <Route path="/home/*" element={wrapPrivateRoute(<Home />, isLoggedIn)} />
      </Routes>
    </Router>
  );
}

export default App
