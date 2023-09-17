import React from 'react'
import { Link,NavLink } from "react-router-dom";


function Footer() {
  return (
    <>
   
<footer className="bg-white mt-auto rounded-lg shadow  dark:bg-gray-800">
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://ayanbiswas-portfolio.netlify.app/" className="hover:underline">Ayan_Biswas™</a>. All Rights Reserved.
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
    <NavLink  to={"/about"}>
        <li className="mr-4 hover:underline md:mr-6">
             About
        </li>
      </NavLink>
      <NavLink  to={"/policy"}>
        <li className="mr-4 hover:underline md:mr-6">
            Privacy Policy
        </li>
      </NavLink>
      <NavLink  to={"/contact"}>
        <li className="hover:underline">
          Contact
        </li>
      </NavLink>
    </ul>
    </div>
</footer>

    </>
  )
}

export default Footer