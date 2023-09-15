import React from "react";
import { Link,Outlet } from "react-router-dom";

function Header() {
  return (
    <div>
      <ul className="flex justify-evenly">
        <Link to={"/"}>
          <li>Home</li>
        </Link>
        <Link to={"/about"}>
          <li>About</li>
        </Link>
        <Link to={"/contact"}>
          <li>Contact</li>
        </Link>
      </ul>
    </div>
  );
}

export default Header;
