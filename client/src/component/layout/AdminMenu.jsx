import React from "react";
import { Link } from "react-router-dom";

function AdminMenu() {
  return (
    <>
      <div className=" m-4 font-medium text-gray-900 bg-white border border-gray-200 rounded-lg ">
        <Link   to="/dashboard/admin" className="block w-full px-4 py-6 text-white bg-blue-700">
          Admin Panal
        </Link>
        <Link
          to="/dashboard/admin/create-catagory"
          className="block   w-full px-4 py-6 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
        >
          Create Category
        </Link>
        <Link
          to="/dashboard/admin/create-product"
          className="block w-full px-4 py-6 border-b border-gray-200 cursor-pointer hover:bg-gray-100 "
        >
          Create product
        </Link>
        <Link
          to="/dashboard/admin/create-users"
          className="block w-full px-4 py-6 rounded-b-lg cursor-pointer hover:bg-gray-100 "
        >
          User
        </Link>
      </div>
    </>
  );
}

export default AdminMenu;
