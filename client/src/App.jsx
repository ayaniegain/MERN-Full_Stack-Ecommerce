import "./App.css";
import Home from "./component/pages/Home";
import Contact from "./component/pages/Contact";
import About from "./component/pages/About";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./component/pages/PageNotFound";
import Policy from "./component/pages/Policy";
import Register from "./component/pages/Auth/Register";
import Login from "./component/pages/Auth/Login";
import Dashboard from "./component/pages/user/Dashboard";
import {Private} from "./component/Routes/Private";
import ForgotPassword from "./component/pages/Auth/forgotPassword";
import { AdminRoute } from "./component/Routes/AdminRoute";
import AdminDashboard from "./component/pages/Admin/AdminDashboard";

function App() {
  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Private />}>
      <Route path="user" element={<Dashboard />} />
      </Route>
      <Route path="/dashboard" element={<AdminRoute />}>
      <Route path="admin" element={<AdminDashboard />} />
      </Route>
      <Route path="/contact" element={<Contact />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/about" element={<About />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
