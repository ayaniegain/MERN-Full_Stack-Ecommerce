import { useState } from "react";
import "./App.css";
import Layout from "./component/layout/Layout";
import Home from "./component/pages/Home";
import Contact from "./component/pages/Contact";
import About from "./component/pages/About";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./component/pages/PageNotFound";
import UserProfile from "./component/pages/UserProfile";
import UsersIndex from "./component/pages/UsersIndex";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} >
             <Route path=":id" element={<UserProfile />} />
             <Route path="index" element={<UsersIndex/>} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
        ;
      </Layout>
    </>
  );
}

export default App;
