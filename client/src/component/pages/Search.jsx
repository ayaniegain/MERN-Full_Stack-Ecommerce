import React from "react";
import Layout from "../layout/Layout";
import { useSearch } from "../context/search";
import { Link, NavLink } from "react-router-dom";

function Search() {
  const [values, setValues] = useSearch();

  console.log(values.keyword)
  return (
    <Layout title={"search"}>
      <div className="container mx-auto flex justify-center mt-9 ">
        {/* Product Card Section */}
        {(values?.results.length < 1) || (values?.keyword=='') ? (
          <section className="bg-gray-100 text-center p-8">
            <div className="bg-white p-40 rounded shadow-md">
              <h2 className="text-4xl font-bold mb-4">No Search Results found</h2>
              <br />
              <h2 className="text-2xl text-bold">
                Back to Home Page 🏠
                <NavLink
                  to={"/"}
                  className="relative px-5 py-3 mx-4 overflow-hidden font-medium text-gray-600 bg-gray-200 border border-gray-100 rounded-lg shadow-inner group"
                >
                  <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                  <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                  <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                  <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                  <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                  <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
                    Home
                  </span>
                </NavLink>
              </h2>
            </div>
          </section>
        ) : (
          <main className="w-3/4 p-4 flex ">
            {/* Product cards container (flexbox) */}

            <div className="p-6  w-full">
              <h1 className="text-3xl font-bold text-center">
                Search for <span className="text-green-700">'{values.keyword}' </span> results (<span className="text-red-700">{values.results.length}</span>)
              </h1>
              <div className="flex  gap-4 mx-2 my-4 flex-wrap w-full  ">
                {values?.results.map((item) => (
                  <Link
                    key={item._id}
                  to={`/product/${item.slug}`}

                  >
                    <div className="max-w-xs w-64 h-full rounded overflow-hidden shadow-lg border">
                      <img
                        className="w-full "
                        src={`${
                          import.meta.env.VITE_REACT_APP_API
                        }/api/v1/product/photo-product/${item._id}`}
                        alt="Product Image"
                      />
                      <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">
                          {" "}
                          {item.name}
                        </div>
                        <p className="text-gray-700 text-base">
                          {item.description}
                        </p>
                      </div>
                      <div className="px-6 py-4">
                        <span className="text-gray-700 text-base font-semibold">
                          ₹ {item.price}
                        </span>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full float-right">
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </main>
        )}
      </div>


      {  values?.results.length>1 && 
      <div className="flex justify-center">
        <h2 className="text-2xl text-bold my-2  ">Explore more Products 🎁</h2>
        <NavLink
          to={"/"}
          className=" relative px-5 py-3 mx-4 overflow-hidden font-medium text-gray-600 bg-gray-200 border border-gray-100 rounded-lg shadow-inner group"
        >
          <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
          <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
          <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
          <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
          <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
          <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
         Click
          </span>
        </NavLink>
      </div>
      }
    </Layout>
  );
}

export default Search;
