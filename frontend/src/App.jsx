import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Layout/Header';
import Footer from './Components/Layout/Footer';
import Home from './Components/Home';
import Login from './Components/User/Login';
import Register from  './Components/User/Register'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import {gapi} from 'gapi-script';
import { useEffect } from 'react';
function App() {

  useEffect(() =>
  {
    function start() {
    gapi.client.init({
        clientId: "1050826465955-mpgi9kopddpq75bacchdjkaeahbqr58e.apps.googleusercontent.com",
        scope: ""
    })
  
  };

  gapi.load('client:auth2', start);
});
  return (
    <Router>
      <ToastContainer/>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} end />
        <Route path="/search/:keyword" element={<Home />} exact="true" />
        <Route path="/login" element={<Login />} exact="true" />
        <Route path="/register" element={<Register />} exact="true" />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;