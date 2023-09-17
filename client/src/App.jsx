import "./App.css";
import Home from "./component/pages/Home";
import Contact from "./component/pages/Contact";
import About from "./component/pages/About";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./component/pages/PageNotFound";
import Policy from "./component/pages/Policy";
import Register from "./component/pages/Auth/Register";
import Login from "./component/pages/Auth/Login";

function App() {
  
  return (
    <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
        ;
    </>
  );
}

export default App;
