import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate, useNavigation } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import { useCart } from "../context/cart";

function Header() {
  let navigate = useNavigate();
  let [cart, setCart] = useCart();
  let [auth, setAuth] = useAuth();
  let loginStatus = auth.loginStatus;

  const handleClick = () => {
    setAuth(
      {
        ...auth,
        user: null,
        token: "",
        loginStatus: false,
      },
      localStorage.removeItem("auth"),
      setTimeout(() => {
        toast.success("user Logout successfully");
      }, 1000)
    );
  };
  return (
    <>
    <nav className="bg-gray-600 shadow bg-gradient-to-r from-pink-200 via-black">
  <div className="max-w-screen-xl flex  flex-wrap  items-center justify-between mx-auto p-3   ">
    <Link to={"/"} className="flex items-center">
      <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
        🦉 Krazy-Kart
      </span>
    </Link>
    <SearchInput />
    <div className="  text-white w-full md:block md:w-auto" id="navbar-default">
      <ul className=" flex-row font-medium  text-[10px] md:text-sm flex md:flex-col p-2 md:p-0 mt-4 ml-4 rounded-lg  md:space-x-8 md:mt-0 bg-gray-900">
        <NavLink to={"/"} activeClassName="text-pink-400" exact>
          <li className="block py-2 pl-3 pr-4">Home</li>
        </NavLink>
        <NavLink to={"/about"} activeClassName="text-pink-400">
          <li className="block py-2 pl-3 pr-4 text-white rounded md:border-0 md:p-0">
            About
          </li>
        </NavLink>
        {!loginStatus && (
          <NavLink to={"/register"} activeClassName="text-pink-400">
            <li className="block py-2 pl-3 pr-4 text-white rounded md:border-0 md:p-0">
              Register
            </li>
          </NavLink>
        )}
        <div className="block py-2 pl-3 pr-4 text-white rounded md:border-0 md:p-0">
          {!loginStatus ? (
            <NavLink to={"/login"} activeClassName="text-pink-400">Login</NavLink>
          ) : (
            <div className="nav-item dropdown">
              <div
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {auth?.user?.name}
              </div>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdown"
              >
                <Link
                  className="dropdown-item"
                  to={`/dashboard/${auth?.user?.role == 1 ? "admin" : "user"}`}
                >
                  Dashboard
                </Link>
                <Link
                  className="dropdown-item"
                  onClick={handleClick}
                  to="/login"
                >
                  Logout
                </Link>
              </div>
            </div>
          )}
        </div>
        <NavLink to={"/cart"} activeClassName="text-pink-400">
          <li className="block py-2 pl-3 pr-4 text-white rounded md:border-0 md:p-0">
            Cart
            <span className="text-red-500 mx-2 font-bold">
              ({cart.length})
            </span>
          </li>
        </NavLink>
      </ul>
    </div>
  </div>
</nav>

    </>
  );
}

export default Header;
