import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import {AuthProvider}  from "./component/context/useAuth.jsx";
import { SrarchProvider } from "./component/context/search.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
  <SrarchProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SrarchProvider>
  </AuthProvider>
);
