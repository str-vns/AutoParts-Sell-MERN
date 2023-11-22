import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Layout/Header";
import Footer from "./Components/Layout/Footer";
import Home from "./Components/Home";
import Login from "./Components/User/Login";
import Register from "./Components/User/Register";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { gapi } from "gapi-script";
import { useEffect, useState } from "react";
import UpdatePassword from "./Components/User/UpdatePassword";
import ForgotPassword from "./Components/User/ForgotPassword";
import NewPassword from "./Components/User/NewPassword";
import Profile from "./Components/User/Profile";
import UpdateProfile from "./Components/User/UpdateProfile";
import ProductDetails from "./Components/Product/ProductDetails";
import ShippingShow from "./Components/Shipping/ShippingShow";
import AddShipping from "./Components/Shipping/AddShipping";
import UpdateShipping from "./Components/Shipping/UpdateShipping";
import Cart from "./Components/Cart/Carts";
import Shipping from "./Components/Cart/Shipping";
import axios from "axios";
import ConfirmOrder from "./Components/Cart/ConfirmOrder";
import Payment from "./Components/Cart/Payment";
import ListOrders from "./Components/Order/ListOrders";
import OrderDetails from "./Components/Order/OrderDetails";
import Dashboard from "./Components/Admin/Dashboard";
import ProtectedRoute from "./Components/Route/ProtectedRoute";
import CreateProducts from "./Components/Admin/CreateProducts";
import ProductList from "./Components/Admin/ProductList";
import UpdateProducts from "./Components/Admin/UpdateProducts";
import Accountslist from "./Components/Admin/Accountslist";
import AccountUpdate from "./Components/Admin/AccountUpdate";
import OrdersList from "./Components/Admin/OrdersList";
import OrdersProcess from "./Components/Admin/OrdersProcess";
import ReviewsProduct from "./Components/Admin/ReviewsProduct";
function App() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "1050826465955-mpgi9kopddpq75bacchdjkaeahbqr58e.apps.googleusercontent.com",
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
  });

  const [state, setState] = useState({
    cartProducts:
      localStorage.getItem("cartProducts") &&
      localStorage.getItem("cartProducts") !== "undefined"
        ? JSON.parse(localStorage.getItem("cartProducts"))
        : [],
        ShippingCope: localStorage.getItem('ShippingCope')
        ? JSON.parse(localStorage.getItem('ShippingCope'))
        : {},
  });

  const addCart = async (id, quantity) => {
    console.log(id, quantity);
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/product/${id}`
      );
      const item = {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.stock,
        quantity: quantity,
      };
      const ifItem = state.cartProducts.find((i) => i.product === item.product);
      console.log(ifItem, state);
      if (ifItem) {
        setState({
          ...state,
          cartProducts: state.cartProducts.map((i) =>
            i.product === ifItem.product ? item : i
          ),
        });
      } else {
        setState({
          ...state,
          cartProducts: [...state.cartProducts, item],
        });
      }

      toast.success("Item Added", {
        position: "top-right",
      });
    } catch (error) {
      console.log(error);
      toast.error("Item Not Added", {
        position: "top-right",
      });
    }
  };

  const removeCart = async (id) => {
    setState({
      ...state,
      cartProducts: state.cartProducts.filter((i) => i.product !== id),
    });
  };

  const shippingIds = (id) => {
    setState({
      ...state,
      ShippingCope: { id: id }
    });
  };

  return (
    <Router>
      <ToastContainer />
      <Header cartProducts={state.cartProducts} />
      <Routes>
        <Route path="/" element={<Home />} end />
        <Route path="/search/:keyword" element={<Home />} exact="true" />
        <Route path="/login" element={<Login />} exact="true" />
        <Route path="/register" element={<Register />} exact="true" />
        <Route path="/password/forgot" element={<ForgotPassword />} exact="true" />
        <Route
          path="/password/reset/:token"
          element={<NewPassword />}
          exact="true"
        />
        <Route path="/profile" element={<Profile />} exact="true" />
        <Route
          path="/password/update"
          element={<UpdatePassword />}
          exact="true"
        />
        <Route
          path="/proflie/update"
          element={<UpdateProfile />}
          exact="true"
        />
        <Route path="/product/:id" element={ <ProductDetails cartProducts={state.cartProducts} addCart={addCart} /> } exact="true" />
        <Route path="/shippingShow" element={<ShippingShow />} exact="true" />
        <Route path="/shipping/create" element={<AddShipping />} exact="true" />
        <Route path="/shipping/:id" element={<UpdateShipping />} exact="true" />
        <Route path="/cart" element={<Cart cartProducts={state.cartProducts} addCart={addCart} removeCart={removeCart}/> } exact="true" />
        <Route path="/shippings" element={ <Shipping shipping={state.ShippingCope} shippingIds={shippingIds} /> }/>
        <Route path="/confirm" element={<ConfirmOrder cartProducts={state.cartProducts} ShippingCope={state.ShippingCope}/>} exact="true"/>
        <Route path="/payment" element={<Payment cartProducts={state.cartProducts} shippingInfo={state.ShippingCope} />} />
        <Route />
        <Route path="/orderlist/my" element={<ListOrders />} exact="true" />
        <Route path="/OrderDetail/:id" element={<OrderDetails />} exact="true" />
        {/* admin */}
        <Route path="/Dashboard" element={<ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute>} exact="true" />
        <Route path="/ProductList" element={<ProtectedRoute isAdmin={true}><ProductList /></ProtectedRoute>} exact="true" />
        <Route path="/CreateProduct" element={<ProtectedRoute isAdmin={true}><CreateProducts /></ProtectedRoute>} exact="true" />
        <Route path="/UpdateProduct/:id" element={<ProtectedRoute isAdmin={true}><UpdateProducts /></ProtectedRoute>} exact="true" />
        <Route path="/AccountList" element={<ProtectedRoute isAdmin={true}><Accountslist /></ProtectedRoute>} exact="true" />
        <Route path="/AccountUpdate/:id" element={<ProtectedRoute isAdmin={true}><AccountUpdate /></ProtectedRoute>} exact="true" />
        <Route path="/OrderList" element={<ProtectedRoute isAdmin={true}><OrdersList /></ProtectedRoute>} exact="true" />
        <Route path="/OrderProcess/:id" element={<ProtectedRoute isAdmin={true}><OrdersProcess /></ProtectedRoute>} exact="true" />
        <Route path="/ReviewsProduct" element={<ProtectedRoute isAdmin={true}><ReviewsProduct /></ProtectedRoute>} exact="true" />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
