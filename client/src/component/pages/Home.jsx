import React, { useEffect, useMemo, useState } from "react";
import Layout from "../layout/Layout";
import { Link, NavLink } from "react-router-dom";
import { useContextData } from "../context/useAuth";
import toast from "react-hot-toast";
import axios from "axios";

function Home() {
  let [auth, setAuth] = useContextData();
  let [products, setProducts] = useState([]);
  let [categories, setCategories] = useState([]);
  let [filterCatagory, setFilterCatagory] = useState('');

  //get catagory

  async function getCatagoryApi() {
    try {
      let data = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/category/getall-category`
      );
      setCategories(data?.data?.category);
    } catch (error) {
      toast.error("something went wrong in create Categories");
      console.log(error);
    }
  }
  
  //get products
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
  //handle filter

  const handleFilter=(cid)=>{
    setFilterCatagory(cid?.target?.value)
    // console.log(cid?.target?.value)
    // console.log(products)
     
    //   let filterProduct =products.filter((p)=> (p.category._id)===(cid.target.value))
    //     console.log(filterProduct)
      
    //     setProducts(filterProduct)
  }

  function getFilteredList() {
    // Avoid filter when selectedCategory is null
    if (!filterCatagory) {
      return products;
    }
    return products.filter((p) => filterCatagory === (p.category._id))
  }

  // Avoid duplicate function calls with useMemo
   products = useMemo(getFilteredList, [filterCatagory, products]);




  useEffect(() => {
    getCatagoryApi()
  }, []);

  useEffect(() => {
    getAllProducts();
  }, []);

  console.log(products)

  return (
    <Layout title={"Home"}>
      <div className="container mx-auto mt-9 flex">
        {/* Left Sidebar (Filter Section) */}
        <aside className="w-1/5 p-4 my-20 bg-gray-200">
          {/* Your filter options can go here */}
          {/* Example filter options */}
          <h2 className="text-lg font-semibold mb-4">Filter By:</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium">Category</label>
            <select className="form-select mt-1 block w-full" 
                onChange={(e) => handleFilter(e)}            
            >
            <option>Choose a Category</option>
                {categories.map((e) => (
                  <option key={e._id} value={e._id}>
                    {e.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Price Range</label>
            <input
              type="range"
              className="form-range text-white mt-1 block w-full"
              min={0}
              max={100}
              step={1}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Color</label>
            <div className="flex space-x-2">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Red</span>
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Blue</span>
              </label>
              {/* Add more color options here */}
            </div>
          </div>
          {/* Add more filter options as needed */}
        </aside>

        {/* Product Card Section */}
        <main className="w-3/4 p-4 flex ">
          {/* Product cards container (flexbox) */}

          <div className="p-6  w-full">
            <h1 className="text-3xl font-bold text-center">Get All Products</h1>
            <div className="flex  justify-between gap-4 mx-2 my-4 flex-wrap w-full  ">
              {products?.map((item) => (
                <section
                  key={item._id}
                  to={`/dashboard/admin/products/${item.slug}`}
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
                      <div className="font-bold text-xl mb-2"> {item.name}</div>
                      <p className="text-gray-700 text-base">
                        {item.description}
                      </p>
                    </div>
                    <div className="px-6 py-4">
                      <span className="text-gray-700 text-base font-semibold">
                        $ {item.price}
                      </span>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full float-right">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}

export default Home;
