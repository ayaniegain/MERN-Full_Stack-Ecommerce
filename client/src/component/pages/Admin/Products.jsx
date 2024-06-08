import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import AdminMenu from "../../layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Products() {
  let [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      let { data } = await axios.get(
        `/api/v1/product/getall-product`
      );
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
      <div className="flex md:flex-row flex-col md:justify-start md:items-start justify-center items-center">

        <div className="mx-6 my-4">
          <AdminMenu />
        </div>
        <div className="p-6 my-8">
          <h1 className="text-3xl">Get All Products</h1>
          <div className="flex  max-w-full ">
            <div className="flex-row flex gap-10 flex-wrap ">

            {products.map((item) => (
              <Link key={item._id} to={`/dashboard/admin/products/${item.slug}`}>
                <div className="max-w-sm bg-white   border my-4  border-gray-200 rounded-lg shadow">
                  <img
                    className="rounded-t-lg h-52 w-full"
                    src={`/api/v1/product/photo-product/${item._id}`}
                    alt="product image"
                  />
                  <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                      {item.name}
                    </h5>
                    <p className="mb-3 font-normal text-gray-700">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        </div>
      </div>
    </Layout>
  );
}

export default Products;
