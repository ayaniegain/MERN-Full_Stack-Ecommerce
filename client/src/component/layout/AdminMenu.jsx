import React from "react";
import { Link, NavLink } from "react-router-dom";

function AdminMenu() {
  return (
    <>
      <div className=" m-4 font-medium text-gray-900 bg-white border border-gray-200 rounded-lg ">
        <Link   to="/dashboard/admin" className="block w-full px-4 py-6  bg-gray-300 ">
          Admin Panal
        </Link>
        <NavLink
          
          to="/dashboard/admin/create-catagory"
          className="block   w-full px-4 py-6 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
        >
          Create Category
        </NavLink>
        <NavLink
          
          to="/dashboard/admin/create-product"
          className="block w-full px-4 py-6 border-b border-gray-200 cursor-pointer hover:bg-gray-100 "
        >
          Create product
        </NavLink>
        <NavLink
          
          to="/dashboard/admin/products"
          className="block w-full px-4 py-6 border-b border-gray-200 cursor-pointer hover:bg-gray-100 "
        >
          Products
        </NavLink>
        <NavLink
          
          to="/dashboard/admin/create-order"
          className="block w-full px-4 py-6 border-b border-gray-200 cursor-pointer hover:bg-gray-100 "
        >
          Orders
        </NavLink>
      
      </div>
    </>
  );
}

export default AdminMenu;
