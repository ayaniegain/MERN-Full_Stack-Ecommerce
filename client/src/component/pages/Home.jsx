import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Price } from "../../assets/Price";
import Button from "../../assets/Buttton";
import { Link } from "react-router-dom";
import { useCart } from "../context/cart";
import Simmer from "../../assets/Simmer";
import { AiOutlineBars } from "react-icons/Ai";

function Home() {
  const [products, setProducts] = useState([  {

    _id: '651d7b17beef0085f914cc8c',

    name: 'Polo Tshirt',

    slug: 'Polo-Tshirt',

    description: 'cotton shirt one',

    price: 300,

    category: {

      _id: '651d7a09beef0085f914cc77',

      name: 'men-collection',

      slug: 'men-collection',

      __v: 0

    },

    quantity: 2,

    __v: 0

  },

  {

    _id: '651d7b7ebeef0085f914cc9a',

    name: 'Np stylish Shirt',

    slug: 'Np-stylish-Shirt',

    description: 'summer Tshirt two',

    price: 800,

    category: {

      _id: '651d7a09beef0085f914cc77',

      name: 'men-collection',

      slug: 'men-collection',

      __v: 0

    },

    quantity: 1,

    __v: 0

  },

  {

    _id: '651d7cdbbeef0085f914ccad',

    name: 'women dress',

    slug: 'women-dress',

    description: 'gorgeous women wear',

    price: 200,

    category: {

      _id: '651d7a12beef0085f914cc7c',

      name: 'women-collection',

      slug: 'women-collection',

      __v: 0

    },

    quantity: -6,

    __v: 0

  },

  {

    _id: '651d7d04beef0085f914ccb7',

    name: 'winter jacket',

    slug: 'winter-jacket',

    description: 'women stylish jacket',

    price: 400,

    category: {

      _id: '651d7a12beef0085f914cc7c',

      name: 'women-collection',

      slug: 'women-collection',

      __v: 0

    },

    quantity: 4,

    __v: 0

  },]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [page, setPage] = useState(6);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();
  const [sort, setSort] = useState("");
  const [controlFilter, setControlFilter] = useState(false);
  const [toggle, setToggle] = useState(true);

  async function getAllCatagories() {
    try {
      let data = await axios.get(`/api/v1/category/getall-category`);
      setCategories(data?.data?.category);
    } catch (error) {
      toast.error("something went wrong in create Categories");
      console.log(error);
    }
  }


  const getAllProducts = async () => {
    try {
      let { data } = await axios.get(`/api/v1/product/getall-product`);
      if (!controlFilter) {
        setTimeout(() => {
          setProducts(data?.products);
        }, 800);
      }
      setControlFilter(!controlFilter);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const handleFiltercheck = (checkedItem, id) => {
    let all = [...checked];
    if (checkedItem) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  let handleLoadingChange = () => {
    setPage(page + 5);
    if (page >= products.length) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  };

  const filteredProduct = async () => {
    try {
      const { data } = await axios.post(
        `/api/v1/product/product-filters`,
        { checked, radio }
      );
      if (controlFilter) {
        setProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchsortedProducts = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-sort?sort=${sort}`
      );
      setProducts(data?.products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (sort) fetchsortedProducts();
  }, [sort]);

  useEffect(() => {
    getAllCatagories();
  }, []);

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filteredProduct();
  }, [checked, radio]);

  const handlereset = () => {
    window.location.reload();
  };

  const handleCart = (e, item) => {
    e.preventDefault();

    setCart([...cart, item]);
    localStorage.setItem("cart", JSON.stringify([...cart, item]));
    toast.success("item added to cart");
  };

  const toggleSidebar = () => {
    setToggle(!toggle);
  };

  return (
    <Layout title={"Home"}>
      <div className="flex justify-center w-full gap-10 bg-gradient-to-t from-pink-100 via-gray-900 to-pink-100 ">
        <div className="my-12 relative">
          <button
            className="text-3xl absolute left-10 bg-white md:hidden block"
            onClick={toggleSidebar}
          >
            <AiOutlineBars />
          </button>
        </div>
        {toggle && (
          <aside className="lg:w-1/5 p-4 mx-10 my-20 absolute md:relative sm:w-2/4 text-white bg-gradient-to-t from-pink-900 to-gray-900 transition-all duration-300">
            <div>
              <h2 className="text-lg font-semibold mb-3">Sort By:</h2>
              <div>
                <select
                  className="form-select mt-1 block w-full my-3"
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="">Select Price</option>
                  <option value="high-to-low">High to Low</option>
                  <option value="low-to-high">Low to High</option>
                  <option value="relevance">Relevance</option>
                </select>
              </div>
              <h2 className="text-lg font-semibold mb-3">Filter By:</h2>
              <div className="mb-4 xl:col ">
                <label className="block mb-2 text-sm font-medium">
                  Categories
                </label>
                <div className="flex justify-start row flex-wrap">
                  {categories?.map((c) => (
                    <label
                      key={c._id}
                      className="inline-flex items-center"
                    >
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        onChange={(e) =>
                          handleFiltercheck(e.target.checked, c._id)
                        }
                      />
                      <span className="ml-2">{c.name}</span>
                    </label>
                  ))}
                </div>
                <div className="mb-4 my-4">
                  <label className="block mb-2 text-sm font-medium">
                    Filter By Price
                  </label>
                  <div className="flex justify-start row flex-wrap">
                    {Price?.map((p) => (
                      <label
                        key={p._id}
                        className="inline-flex items-center"
                      >
                        <input
                          type="radio"
                          className="form-radio"
                          name={"m"}
                          value={p.array}
                          onChange={(e) => setRadio(e.target.value)}
                        />
                        <span className="ml-2">{p.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <Button
                  className="bg-red-500 h-8 w-20 border-none text-white font-bold"
                  handlereset={handlereset}
                  children="RESET"
                />
              </div>
            </div>
          </aside>
        ) 
        
       
        
        }
        <main className="lg:w-3/5 my-20">
          <div className="">
            <div className="flex gap-20 flex-wrap">
              {products.length > 0 ? (
                <>
                  {products?.map((item) => (
                    <Link key={item._id} to={`/product/${item.slug}`}>
                      <div className="w-60 h-full overflow-hidden flex flex-col rounded shadow-lg border bg-white">
                        <img
                          className="h-64 w-full"
                          src={`/api/v1/product/photo-product/${item._id}`}
                          alt="Product Image"
                        />
                        <div className="px-6 py-4 flex flex-col justify-start">
                          <div className="font-bold text-xl mb-2 ">
                            {item.name}
                          </div>
                          <p className="text-gray-700 text-base">
                            {item.description}
                          </p>
                        </div>
                        <div className="px-6 py-4 flex flex-row justify-between items-center">
                          <div className="text-gray-700 text-base font-semibold">
                            ₹ {item.price}
                          </div>
                          <button
                            onClick={(e) => handleCart(e, item)}
                            className="bg-gray-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full float-right"
                          >
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </Link>
                  ))}
                </>
              ) : (
                <Simmer />
              )}
            </div>
            <div className="d-grid md: mx-auto my-20 w-6/12 content-center bg-red-500 text-white">
              {loading ? (
                <button
                  onClick={handleLoadingChange}
                  type="button"
                  className="btn disabled text-white font-bold no-border"
                >
                  That's It
                </button>
              ) : (
                
                products.length > 0 && (
                  
                  <button
                    onClick={handleLoadingChange}
                    type="button"
                    className="btn btn-danger no-border "
                    >
                    Load More +
                  </button>
                )
              )}
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}

export default Home;
