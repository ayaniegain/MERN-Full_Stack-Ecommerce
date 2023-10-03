import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import AdminMenu from "../../layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, NavLink, useLocation } from "react-router-dom";

function Products() {
  let [products, setProducts] = useState([]);

  // console.log(products)

  const getAllProducts = async () => {
    try {
      let { data } = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/product/getall-product`
      );
      console.log(data)
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);


  return (
    <Layout>
      <div className="flex col">
        <div className="mx-6 my-4">
          <AdminMenu />
        </div>
        <div className="p-6 my-8">
          <h1 className="text-3xl">Get All Products</h1>
          <div className="flex gap-3  ">
          {products.map((item) => (
            <Link key={item._id} to={`/dashboard/admin/products/${item.slug}`} >
              <div className="max-w-sm bg-white  h-40 w-60 border my-4 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <img
                  className="rounded-t-lg"
                  src={`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/photo-product/${item._id}`}
                  alt="product image"
                />
                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {item.name}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Products;
