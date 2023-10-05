import React, { useEffect, useMemo, useState } from "react";
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
  let [products, setProducts] = useState([]);
  let [categories, setCategories] = useState([]);
  let [filterCatagory, setFilterCatagory] = useState("");
  let [checked, setChecked] = useState([]);
  let [radio, setRadio] = useState([]);
  // let [total, setTotal] = useState(0);
  let [page, setPage] = useState(6);
  let [loading, setLoading] = useState(false);
  // let initialPosts  = products.slice(0, page)
  let [cart, setCart] = useCart(); //usecontext
  const [sort, setSort] = useState("");
  products = products.slice(0, page);
  const [controlFilter, setControlFilter] = useState(false);
  // console.log(initialPosts);
  //get catagory
  async function getAllCatagories() {
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
      // setLoading(true)
        let { data } = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API}/api/v1/product/getall-product`
          );
          if(!controlFilter){
            setProducts(data?.products);
          }
          setControlFilter(!controlFilter)
    } catch (error) {
      // setLoading(false)
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
  //get Filtered
  const filteredProduct = async () => {
    try {
      
      
      const { data } = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/product/product-filters`,
        { checked, radio }
        );
        if(controlFilter){
          setProducts(data?.products);
        }
        setControlFilter(!controlFilter)
    } catch (error) {
      console.log(error);
    }
  };

  // get shorted
  const fetchsortedProducts = async () => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/api/v1/product/product-sort?sort=${sort}`
      );
      setProducts(data?.products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (sort) fetchsortedProducts();
    //sorted product
  }, [sort]);

  useEffect(() => {
    getAllCatagories();
    // getTotal();
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

  //cart
  const handleCart = (e, item) => {
    e.preventDefault();

    setCart([...cart, item]);
    localStorage.setItem("cart", JSON.stringify([...cart, item]));
    toast.success("item added to cart");
  };

  const [toggle, setToggle] = useState(true);

  return (
    <Layout title={"Home"}>
      <div className="container mx-auto mt-9 flex">
        {/* Left Sidebar (Filter Section) */}
        <div className="my-12 relative left-7">
          <button className="text-3xl " onClick={() => setToggle(!toggle)}>
            <AiOutlineBars />
          </button>
        </div>
        {toggle ? (
          <aside className=" lg:w-1/5 p-4 my-20 bg-gray-200 sm:w-2/4">
            {/* Your filter options can go here */}

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
                <div className="flex justify-start  flex-wrap space-x-2 ">
                  {categories?.map((c) => (
                    <label key={c._id} className="inline-flex  items-center">
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

                <div className="mb-4  my-4">
                  <label className="block mb-2 text-sm font-medium">
                    Filter By Price
                  </label>
                  <div className="flex justify-start  flex-wrap space-x-2 ">
                    {Price?.map((p) => (
                      <label key={p._id} className="inline-flex  items-center">
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
              {/* Add more filter options as needed */}
              <div>
                <Button
                  className="bg-red-500 h-8 w-20 border-none text-white font-bold"
                  handlereset={handlereset}
                  children="RESET"
                />
              </div>
            </div>
          </aside>
        ) : (
          <div></div>
        )}

        {/* Product Card Section */}
        <main className="w-3/4 p-4 flex ">
          {/* Product cards container (flexbox) */}

          <div className="p-6  w-full">
            <h1 className="text-3xl font-bold text-center">All Products</h1>
            <div className="flex  justify-between gap-4 mx-2 my-4 flex-wrap w-full  ">
            {products.length>0 ?<>
                  {products?.map((item) => (
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
                      <div className="font-bold text-xl mb-2"> {item.name}</div>
                          <p className="text-gray-700 text-base">
                            {item.description}
                          </p>
                        </div>
                        <div className="px-6 py-4">
                          <span className="text-gray-700 text-base font-semibold">
                            ₹ {item.price}
                          </span>
                      <button onClick={(e)=>handleCart(e,item)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full float-right">
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </Link>
                  ))}
            </> : <Simmer/> }
            </div>
            <div className="d-grid mx-auto  my-20 w-6/12 content-center  bg-blue-800 text-white">
              {loading ? (
                <button
                  onClick={handleLoadingChange}
                  type="button"
                  className="btn  disabled text-white font-bold  no-border"
                >
                  That's It
                </button>
              ) : (
                products.length > 0 && (
                  <button
                    onClick={handleLoadingChange}
                    type="button"
                    className="btn btn-danger  no-border"
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
