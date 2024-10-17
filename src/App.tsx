import './App.css'
import PrivateRoute from './PrivateRoute';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home';
import Auth from './Auth';

function App() {
  const isLoggedIn = localStorage.getItem('userId') ? true : false;

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
        <Route path="/auth/*" element={isLoggedIn ? <Navigate to="/home" /> : <Auth />} />
        <Route path="/home/*" element={wrapPrivateRoute(<Home />, isLoggedIn)} />
      </Routes>
    </Router>
  );
}

export default App
