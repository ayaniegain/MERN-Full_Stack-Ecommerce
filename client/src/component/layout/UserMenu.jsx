import React from "react";
import { Link } from "react-router-dom";

function UserMenu() {
  return (
    <>
      <div className=" m-4 font-medium text-gray-900 bg-white border border-gray-200 rounded-lg ">
        <Link   to="/dashboard/user" className="block w-full px-4 py-6 text-white bg-blue-700">
          User Panal
        </Link>
        <Link
          to="/dashboard/user/create-profile"
          className="block   w-full px-4 py-6 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
        >
         Profile
        </Link>
        <Link
          to="/dashboard/user/create-order"
          className="block w-full px-4 py-6 border-b border-gray-200 cursor-pointer hover:bg-gray-100 "
        >
          Order
        </Link>
      </div>
    </>
  );
}

export default UserMenu;
