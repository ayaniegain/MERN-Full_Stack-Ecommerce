import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { Outlet } from "react-router-dom";
import Spinner from "../../assets/Spinner";

export const AdminRoute = () => {
  const [ok, setOk] = useState(false);
  let [auth, setAuth] = useAuth();

  useEffect(() => {
    let authCheck = async () => {
      let res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/auth/admin-auth`
      );
      // console.log(res)
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };

    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />;
};

// export default AdminRoute;
