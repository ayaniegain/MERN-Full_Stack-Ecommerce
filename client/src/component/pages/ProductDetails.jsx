import axios from "axios";
import React, { useEffect, useState } from "react";
import { Routes, Route, useParams, Link } from "react-router-dom";
import Layout from "../layout/Layout";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";

function ProductDetails() {
  let { slug } = useParams();
  let [products, setProducts] = useState([]);
  let [relatedProducts, setRelatedProducts] = useState([]);
  const {_id, name,description,price ,category}=products
  let [cart,setCart]=useCart() //usecontext

  console.log(products);

  
  const getAllProducts = async () => {
    try {
      // setLoading(true)
      let { data } = await axios.get(
        `/api/v1/product/single-product/${slug}`
        );
      setProducts(data?.product);
  getrelatedProducts(data?.product?._id,  data?.product?.category?._id);

    } catch (error) {
      // setLoading(false)
      console.log(error);
      toast.error("something went wrong");
    }
  };
  const getrelatedProducts = async (pid,cid) => {
    try {
      // setLoading(true)
      let { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );

      setRelatedProducts(data?.products);
    } catch (error) {
      // setLoading(false)
      console.log(error);
      toast.error("something went wrong");
    }
  };
  //cart
  const handleCart=(e)=>{

    e.preventDefault();

    setCart([...cart,products])
    localStorage.setItem('cart', JSON.stringify([...cart,products]));
    toast.success("item added to cart")
  }

  useEffect(() => {
  if(slug)  getAllProducts();
  }, [slug]);

  return (
    <Layout>
      <section className="text-gray-700 body-font overflow-hidden  bg-slate-100">
          <h1 className="text-3xl flex justify-center mt-10 font-bold">Product Details</h1>
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            {_id?  <img
              alt="ecommerce"
              className="lg:w-80 w-full object-cover object-center rounded border border-gray-200"
              src={`/api/v1/product/photo-product/${_id}`}

            />  :'..loading...'}
           
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                BRAND NAME
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
               {name}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                  </a>
                  <a className="ml-2 text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                    </svg>
                  </a>
                  <a className="ml-2 text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">
                {description} Gastropub blue bottle austin listicle
                pour-over, neutra jean shorts keytar banjo tattooed umami
                cardigan.
              </p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                 
                <div className="flex">
                  <span className="mr-3"> 
              </span>
                  <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none" />
                  <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none" />
                  <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none" />
                </div>
                <div>

                <h2 className="text-sm mx-4 title-font text-gray-500 tracking-widest">
               Category: <span className="font-bold">
                {category?.name}
                </span> 
                
              </h2>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                ₹  {price}
                </span>
                <button onClick={(e)=>handleCart(e)} className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                  add to cart
                </button>
              
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

   {
    
    relatedProducts.length>0?   <div className="p-6  w-full">
    <h1 className="text-2xl font-bold text-center">similar Products</h1>
    <div className="flex  justify-center gap-4 mx-2 my-4 flex-wrap w-full  ">
      {relatedProducts?.map((item) => (
        <Link
          key={item._id}
          to={`/`}
        >
          <div className="max-w-xs  h-80 rounded overflow-hidden shadow-lg border">
            <img
              className=" h-32 w-full "
              src={`/api/v1/product/photo-product/${item._id}`}
              alt="Product Image"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2"> {item.name}</div>
              <p className="text-gray-700 text-base">
                {item.description}
              </p>
            </div>
            <div className="px-6 py-4 flex justify-between items-center">
              <span className="text-gray-700 text-base font-semibold">
                ₹ {item.price}
              </span>
              <button onClick={(e)=>handleCart(e,item)} className="bg-blue-500 hover:bg-blue-700 text-[10px] text-white font-bold py-1.5 px-2 rounded-full float-right">
                        Buy Now
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
    
  </div> :
   <div className="flex justify-center my-4 font-medium text-2xl">
    <h1 >No similar product found</h1>
  </div>
   }
    </Layout>
  );
}

export default ProductDetails;
