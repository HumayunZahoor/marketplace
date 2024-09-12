import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/menu/Navbar.jsx";
import Home from "./components/home/Home.jsx";
import Login from "./components/authentication/Login.jsx";
import Register from "./components/authentication/Register.jsx";
import ChangePassword from "./components/authentication/ChangePassword.jsx";
import AdminPortal from "./components/adminPortal/AdminPortal.jsx";
import SellerPortal from "./components/sellerPortal/SellerPortal.jsx";
import Shop from "./components/shop/Shop.jsx";
import Contact from "./components/contactform/Contact.jsx";
import Cat1 from "./components/shop/Cat1.jsx";
import Cat2 from "./components/shop/Cat2.jsx";
import Cat3 from "./components/shop/Cat3.jsx";
import Cat4 from "./components/shop/Cat4.jsx";
import Cat5 from "./components/shop/Cat5.jsx";
import Cat6 from "./components/shop/Cat6.jsx";
import Cat7 from "./components/shop/Cat7.jsx";
import Cat8 from "./components/shop/Cat8.jsx";
import Cat9 from "./components/shop/Cat9.jsx";
import Cat10 from "./components/shop/Cat10.jsx";
import CreateShopForm from "./components/sellerPortal/CreateShopForm.jsx";
import ShopList from "./components/sellerPortal/ShopList.jsx";
import Success from "./components/stripe/Success.jsx";
import Cancel from "./components/stripe/Cancel.jsx";
import AddProducts from "./components/sellerPortal/addproducts/AddProducts.jsx";
import UpdateProducts from "./components/sellerPortal/updateProducts/UpdateProducts.jsx";
import ProductOnSale from "./components/sellerPortal/onSale/ProductOnSale.jsx";
import UpdateRole from "./components/adminPortal/updateRole/UpdateRole.jsx";
import UsersRequest from "./components/adminPortal/userRequests/UsersRequest.jsx";
import './index.css';

function App() {

  
  return (
    <Router>
    <Navbar/>
      <Routes>
      <Route path="/" exact element={<Home/>} />
      <Route path="/Register" element={<Register />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/ChangePassword" element={<ChangePassword/>} />
      <Route path="/AdminPortal" element={<AdminPortal/>} />
      <Route path="/SellerPortal" element={<SellerPortal/>} />
      <Route path="/Shop" element={<Shop/>} />
      <Route path="/Contact" element={<Contact/>} />
      <Route path="/Cat1" element={<Cat1/>} />
      <Route path="/Cat2" element={<Cat2/>} />
      <Route path="/Cat3" element={<Cat3/>} />
      <Route path="/Cat4" element={<Cat4/>} />
      <Route path="/Cat5" element={<Cat5/>} />
      <Route path="/Cat6" element={<Cat6/>} />
      <Route path="/Cat7" element={<Cat7/>} />
      <Route path="/Cat8" element={<Cat8/>} />
      <Route path="/Cat9" element={<Cat9/>} />
      <Route path="/Cat10" element={<Cat10/>} />
      <Route path="/CreateShopForm" element={<CreateShopForm/>} />
      <Route path="/ShopList" element={<ShopList/>} />
      <Route path="/Success" element={<Success/>} />
      <Route path="/Cancel" element={<Cancel/>} />
      <Route path="/AddProducts" element={<AddProducts/>} />
      <Route path="/UpdateProducts" element={<UpdateProducts/>} />
      <Route path="/ProductOnSale" element={<ProductOnSale/>} />
      <Route path="/UpdateRole" element={<UpdateRole/>} />
      <Route path="/UsersRequest" element={<UsersRequest/>} />
      </Routes>
    </Router>
  );
}

export default App;
