import React, { useContext } from "react";
import { Link, NavLink, useNavigate, useNavigation } from "react-router-dom";
import { useContextData } from "../context/useAuth";
import toast from "react-hot-toast";

function Header() {
  let navigate = useNavigate();

  let [auth, setAuth] = useContextData();
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
      <nav className="bg-white dark:bg-gray-900 shadow">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
          <Link to={"/"} className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8 mr-3"
              alt="Flowbite Logo"
            />
            <span className=" self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              ECommerce
            </span>
          </Link>

          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-2 md:p-0 mt-4  rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <NavLink to={"/"}>
                <li className=" block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  Home
                </li>
              </NavLink>
              <NavLink to={"/about"}>
                <li className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  About
                </li>
              </NavLink>
              {!loginStatus && (
                <NavLink to={"/register"}>
                  <li className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                    Register
                  </li>
                </NavLink>
              )}
              <div className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                {!loginStatus ? (
                  <NavLink to={"/login"}> login</NavLink>
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
                      <NavLink
                        className="dropdown-item"
                        to={`/dashboard/${
                          auth?.user?.role == 1 ? "admin" : "user"
                        }`}
                      >
                        Dashboard
                      </NavLink>
                      <NavLink
                        className="dropdown-item"
                        onClick={handleClick}
                        to="/login"
                      >
                        Logout
                      </NavLink>
                    </div>
                  </div>
                )}
              </div>

              <NavLink to={"/contact"}>
                <li className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  Contact
                </li>
              </NavLink>
              <NavLink to={"/policy"}>
                <li className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  Policy
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
