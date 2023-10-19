import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/useAuth";
import { Link, NavLink, useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
 
function CartPage() {
  let navigate = useNavigate();
  let [cart, setCart] = useCart();
  let [auth, setAuth] = useAuth();
  let ShippingCost = 40.29;
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

//handle unique cart with count
const objectsById = {};

// Iterate through the array and store objects based on their unique _id
cart.forEach(obj => {
  const id = obj._id;
  if (!objectsById[id]) {
    objectsById[id] = obj;
    obj.count = 1; // Initialize count to 1
  } else {
    objectsById[id].count++;
  }
});

// Extract the objects based on unique _id values as an array
const uniqueCart = Object.values(objectsById);




  const handleRemove = (cartId) => {
    // let filteredCart = cart.filter((e) => parseInt(e._id) !== parseInt(cartId));
    // let filteredCart = cart.filter((e) => console.log(e._id));
    // setCart(filteredCart);
    const idsToRemove = new Set([cartId]);

    // Use filter to create a new array without the objects with the specified IDs
    const filteredCart = cart.filter(item => !idsToRemove.has(item._id));
    
    setCart(filteredCart);

    localStorage.setItem("cart", JSON.stringify(filteredCart));
  };
//final price 
  let totalPrice = cart.reduce((pre, curr) => {
    let total = pre + curr.price;
    return total;
  }, 0);

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/braintree/token`);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);
//handlecheckout


  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/braintree/payment`, {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/create-order");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout title={"CartPage"}>


      <div className="h-screen   bg-gray-100 pt-20  overflow-auto">
        <h1 className="mb-8 text-center text-2xl font-bold">{`Hello ${
          auth?.token && auth?.user?.name
        }`}</h1>
        <div className="mx-auto  max-w-5xl text-2xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          {cart.length > 0 ? (
            `You have ${cart.length} ${
              cart.length > 1 ? "items" : "item"
            } in your cart.  ${auth?.token ? "" : `login to check out`}`
          ) : (
            <div className="font-medium text-2xl">
              <h1 className="text-red-500 uppercase ">No Cart found ❌</h1>
              <div className=" my-8 mx-2">
                <Link to="/" className=" hover:bg-yellow-200 hover:text-black">
                  Back to Home 🏡{" "}
                </Link>
              </div>
            </div>
          )}
        </div>
        {/* </div> */}

        <div className="flex  my-10 justify-evenly">
          <div className="flex max-h-max row justify-center w-7/12">
            {uniqueCart.map((item) => (
              <div
                className="lg:flex  lg:row mx-20 rounded-lg w-2/3 overflow-auto  md:w-2/3"
                key={item._id}
              >
                {/* max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl */}
                <div className="overflow-hidden md:max-w-2xl mb-6 w-auto rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                  {/* <img src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="product-image" className="w-full rounded-lg sm:w-40" /> */}
                  <img
                    className="w-40 h-30 "
                    src={`${
                      import.meta.env.VITE_REACT_APP_API
                    }/api/v1/product/photo-product/${item._id}`}
                    alt="Product Image"
                  />
                  <div className="sm:ml-4  mx-40 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg  font-bold text-gray-900">
                        {item.name}
                      </h2>
                      <p className="mt-1 text-x font-bold text-gray-700">
                        Price: ₹{item.price}
                      </p>
                      <p className="mt-1 text-x font-bold text-bold text-red-600">
                          count: {item.count}                          
                      </p>
                    </div>
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      {/* <div className="flex items-center border-gray-100">
              <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
              <input className="h-8 w-8 border  bg-white text-center text-xs outline-none" type="number" defaultValue={2} min={1} />
              <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
            </div> */}
                      <div className="flex items-center space-x-4">
                        <div className="flex hover:text-red-600">
                          <button
                            onClick={() => handleRemove(item._id)}
                            className="font-bold -my-3"
                          >
                            Discard
                          </button>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5  cursor-pointer duration-150 hover:text-red-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex row   h-96 w-5/12">
              {cart.length > 0 && (
                <div className="mt-6  w-auto   rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                  <div className="mb-2 flex  justify-between">
                    <p className="text-gray-700">Subtotal</p>
                    <p className="text-gray-700">₹ {totalPrice}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-700">Shipping</p>
                    <p className="text-gray-700">₹ {ShippingCost}</p>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between">
                    <p className="text-lg font-bold">Total </p>
                    <div>
                      <p className="mb-1 mx-3 text-lg font-bold">
                        ₹{totalPrice + ShippingCost}
                      </p>
                      <p className="text-sm text-gray-700">including VAT</p>
                    </div>
                  </div>
                  <div className="my-6">
                    {!auth?.token ? (
                      <button
                        onClick={() => navigate("/login", { state: "/cart" })}
                        className=" bg-blue-500 py-2.5 px-2 font-medium text-blue-50 hover:bg-blue-600"
                      >
                        login to Check out
                      </button>
                    ) : (
                      <div className="mt-2">
                      {!clientToken || !auth?.token || !cart?.length ? (
                        ""
                      ) : (
                        <div className="w-80 ">
                        
                          <DropIn
                            options={{
                              authorization: clientToken,
                              paypal: {
                                flow: "",
                              },
                            }}
                            onInstance={(instance) => setInstance(instance)}
                          />
      
                          <button
                            className="btn btn-primary"
                            onClick={handlePayment}
                            disabled={loading || !instance}
                          >
                            {loading ? "Processing ...." : "Make Payment"}
                          </button>
                        </div>
                      )}
                    </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
    </Layout>
  );
}

export default CartPage;
