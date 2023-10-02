import React from "react";
import Layout from "../layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/useAuth";
import { Link, NavLink } from "react-router-dom";

function CartPage() {
  let [cart, setCart] = useCart();
  let [auth, setAuth] = useAuth();
  let ShippingCost=40.29
  // console.log(typeof cart[0]._id);

const handleRemove=(cartId)=>{
  let filteredCart=cart.filter((e)=>parseInt(e._id)!==parseInt( cartId))
  setCart(filteredCart)
  localStorage.setItem('cart',JSON.stringify(filteredCart))
}

let totalPrice=cart.reduce((pre,curr)=>{
 let  total=pre+(curr.price)
  return total

},0)


  return (
    <Layout title={"CartPage"}>
      <div className="h-screen bg-gray-100 pt-20  overflow-scroll">
        <h1 className="mb-10 text-center text-2xl font-bold">{`Hello ${
          auth?.token && auth?.user?.name
        }`}</h1>
        <div className="mx-auto max-w-5xl  justify-center px-6 md:flex md:space-x-6 xl:px-0">
          {cart.length > 0
            ? `You have ${cart.length} ${cart.length>1?'items':'item'} in your cart ${
                auth?.token ? "" : "please login to checkout"
              }`
            : <div className="font-medium text-2xl">
            <h1 className='text-red-500 uppercase '>No Cart found ❌</h1>
            <div className=' my-8 mx-2'>
            
            <Link to="/" className=' hover:bg-yellow-200 hover:text-black'>Back to Home 🏡 </Link>
            </div>
            
            </div>
            }
        </div>
      {/* </div> */}



        <div className="flex my-10 justify-evenly">
  <div className="flex row  w-7/12">
        {
    cart.map((item)=>(
      <div className="lg:flex lg:row  rounded-lg w-auto overflow-auto  md:w-2/3" key={item._id}>
      <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
        {/* <img src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="product-image" className="w-full rounded-lg sm:w-40" /> */}
        <img
              className="w-40 h-30 "
              src={`${
                import.meta.env.VITE_REACT_APP_API
              }/api/v1/product/photo-product/${item._id}`}
              alt="Product Image"
            />
        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
          <div className="mt-5 sm:mt-0">
            <h2 className="text-lg  font-bold text-gray-900">{item.name}</h2>
            <p className="mt-1 text-x font-bold text-gray-700">Price: ₹{item.price}</p>
            <p className="mt-1 text-x font-bold text-gray-700">stock: ✔</p>
          </div>
          <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
            {/* <div className="flex items-center border-gray-100">
              <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
              <input className="h-8 w-8 border  bg-white text-center text-xs outline-none" type="number" defaultValue={2} min={1} />
              <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
            </div> */}
            <div className="flex items-center space-x-4">
          <div className='flex hover:text-red-600'>
             <button onClick={()=>handleRemove(item._id)} className='font-bold -my-3'>
               remove
              </button>
              
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5  cursor-pointer duration-150 hover:text-red-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
          </div>
            
            </div>
          </div>
        </div>
      </div>
    
    </div>
    ))
  }
  </div>
  <div className=" flex row  w-3/12">
  

{(cart.length>0 && 

<div className="mt-6 h-96 w-auto   rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
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
  <div className>
    <p className="mb-1 mx-3 text-lg font-bold">₹{totalPrice+ShippingCost}</p>
    <p className="text-sm text-gray-700">including VAT</p>
  </div>
</div>
<button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
</div>

  )


}


  </div>
        </div>
        </div>
    </Layout>
  );
}

export default CartPage;
