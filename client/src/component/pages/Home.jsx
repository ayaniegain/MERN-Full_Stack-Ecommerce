import React, { useEffect, useMemo, useState } from "react";
import Layout from "../layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Price } from "../../assets/Price";
import Button from "../../assets/Buttton";
import { Link } from "react-router-dom";
import { useCart } from "../context/cart";
import Simmer from "../../assets/Simmer";


function Home() {
  let [products, setProducts] = useState([]);
  let [categories, setCategories] = useState([]);
  let [filterCatagory, setFilterCatagory] = useState("");
  let [checked, setChecked] = useState([]);
  let [radio, setRadio] = useState([]);
  // let [total, setTotal] = useState(0);
  let [page, setPage] = useState(6);
  let [loading, setLoading] = useState(false);
  let initialPosts  = products.slice(0, page)
  let [cart,setCart]=useCart()


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
        setProducts(data?.products);
  

      } catch (error) {
        // setLoading(false)
        console.log(error);
      toast.error("something went wrong");
    }
  };

  //handle filter dropdown
  const handleFilter = (cid) => {
    setFilterCatagory(cid?.target?.value);
  };

  function getFilteredList() {

    if (!filterCatagory) {
      return products;
    }
    if (filterCatagory == "") {
      return products;
    }
    return products.filter((p) => filterCatagory === p.category._id);
  }

  // Avoid duplicate function calls with useMemo
  products = useMemo(getFilteredList, [filterCatagory, products]);

  //handle filter checkbox
  const handleFiltercheck = (checkedItem, id) => {
    let all = [...checked];
    if (checkedItem) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // //getTotal count
  // const getTotal = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `${import.meta.env.VITE_REACT_APP_API}/api/v1/product/product-count`
  //     );
  //     setTotal(data?.total);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // //load more

  // useEffect(()=>{
  // if(page==1) return ;
  //  loadmore()
  // },[page])

  // const loadmore = async () => {
  //   try {
  //     setLoading(true)
  //     const { data } = await axios.get(
  //       `${import.meta.env.VITE_REACT_APP_API}/api/v1/product/product-list/${page}`
  //       );
  //       setLoading(false)
  //       setTotal([...products,...data.products]);
  //       setLoading(false)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

let handleLoadingChange=()=>{
  setPage(page + 5)
    if (page >= products.length) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  
}
  //get Filtered
  const filteredProduct = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/product/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // page>6?setProducts(products):setProducts( products.slice(0,page))



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
  const handleCart=(e,item)=>{
    e.preventDefault();

    setCart([...cart,item])
    localStorage.setItem('cart', JSON.stringify([...cart,item]));
    toast.success("item added to cart")
  }

  return (
    <Layout title={"Home"}>
      <div className="container mx-auto mt-9 flex">
        {/* Left Sidebar (Filter Section) */}
        <aside className="lg:w-1/5 p-4 my-20 bg-gray-200 sm:w-2/4">
          {/* Your filter options can go here */}
          {/* Example filter options */}
          <h2 className="text-lg font-semibold mb-4">Filter By:</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium">Category</label>
            <select
              className="form-select mt-1 block w-full"
              onChange={(e) => handleFilter(e)}
            >
              <option value={""}>Choose a Category</option>
              {categories.map((e) => (
                <option key={e._id} value={e._id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4 xl:col ">
            <label className="block mb-2 text-sm font-medium">Categories</label>
            <div className="flex justify-start  flex-wrap space-x-2 ">
              {categories?.map((c) => (
                <label key={c._id} className="inline-flex  items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    onChange={(e) => handleFiltercheck(e.target.checked, c._id)}
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
        </aside>

        {/* Product Card Section */}
        <main className="w-3/4 p-4 flex ">
          {/* Product cards container (flexbox) */}

          <div className="p-6  w-full">
            <h1 className="text-3xl font-bold text-center">All Products</h1>
            <div className="flex  justify-between gap-4 mx-2 my-4 flex-wrap w-full  ">
            {initialPosts.length>0 ?<>
              {initialPosts?.map((item) => (
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

          initialPosts.length>0 &&

            <button onClick={handleLoadingChange} type="button" className="btn btn-danger  no-border">
            Load More +
            </button>
          
        )}
      </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}

export default Home;
