import "./App.css";
import Home from "./component/pages/Home";
import Contact from "./component/pages/Contact";
import About from "./component/pages/About";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./component/pages/PageNotFound";
import Register from "./component/pages/Auth/Register";
import Login from "./component/pages/Auth/Login";
import Dashboard from "./component/pages/user/Dashboard";
import {Private} from "./component/Routes/Private";
import ForgotPassword from "./component/pages/Auth/forgotPassword";
import { AdminRoute } from "./component/Routes/AdminRoute";
import AdminDashboard from "./component/pages/Admin/AdminDashboard";
import CreateCatagory from "./component/pages/Admin/CreateCatagory";
import CreateProduct from "./component/pages/Admin/CreateProduct";
import Orders from "./component/pages/user/Orders";
import Profile from "./component/pages/user/Profile";
import Products from "./component/pages/Admin/Products";
import UpdateProduct from "./component/pages/Admin/UpdateProduct";
import Search from "./component/pages/Search";
import ProductDetails from "./component/pages/ProductDetails";
import CartPage from "./component/pages/CartPage";
import AdminOrder from "./component/pages/Admin/AdminOrder";

function App() {
  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:slug" element={<ProductDetails />} />
      <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<Private />}>
        <Route path="user" element={<Dashboard />} />
        <Route path="user/create-profile" element={<Profile />} />
        <Route path="user/create-order" element={<Orders />} />
      </Route>
      <Route path="/dashboard" element={<AdminRoute />}>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/products" element={<Products />} />
        <Route path="admin/products/:slug" element= {<UpdateProduct />}/>
        <Route path="admin/create-catagory" element={<CreateCatagory />} />
        <Route path="admin/create-product" element={<CreateProduct />} />
        <Route path="admin/create-order" element={<AdminOrder />} />
      </Route>
      <Route path="/contact" element={<Contact />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/about" element={<About />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
