import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContextData } from "../context/useAuth";
import { Outlet } from "react-router-dom";
import Spinner from "../../assets/Spinner";

export const Private = () => {
  const [ok, setOk] = useState(false);
  let [auth, setAuth] = useContextData();

  useEffect(() => {
    let authCheck = async () => {
      let res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/auth/user-auth`
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

  return ok ? <Outlet /> : <Spinner />;
};

// export default Private;