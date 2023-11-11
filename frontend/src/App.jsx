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
import UpdatePassword from './Components/User/UpdatePassword'
import ForgotPassword from './Components/User/ForgotPassword';
import NewPassword from './Components/User/NewPassword';
import Profile from './Components/User/Profile'
import UpdateProfile from './Components/User/UpdateProfile';
import ProductDetails from './Components/Product/ProductDetails';
import ShippingShow from './Components/Shipping/ShippingShow';
import AddShipping from './Components/Shipping/AddShipping';
import  UpdateShipping  from './Components/Shipping/UpdateShipping';

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
        <Route path="/password/forgot" element={<ForgotPassword />} exact="true" />
        <Route path="/password/reset/:token" element={<NewPassword />} exact="true" />
        <Route path="/profile" element={<Profile />} exact="true" />
        <Route path="/password/update" element={<UpdatePassword />} exact="true" />
        <Route path="/proflie/update" element={<UpdateProfile />} exact="true" />
        <Route path="/product/:id" element={<ProductDetails/>} exact="true" />
        <Route path="/shippingShow" element={<ShippingShow/>} exact="true" />
        <Route path="/shipping/create" element={<AddShipping/>} exact="true" />
        <Route path="/shipping/:id" element={<UpdateShipping/>} exact="true" />
        <Route/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;