import React, { useEffect, useState } from 'react'
import UserMenu from '../../layout/UserMenu'
import Layout from '../../layout/Layout'
import toast from "react-hot-toast";
import axios from "axios";
import { NavLink,useNavigate } from "react-router-dom";
import { useAuth } from '../../context/useAuth';



function Profile() {
  //context
  const[auth,setauth]=useAuth()
  //state
  let [formdata, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    setFormData(auth.user);
  },[auth?.user])
  
  let handleSubmit = async (e) => {
    
    e.preventDefault();
    
    try {
      let {data} = await axios.put(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/auth/profile`,
        {
          name: formdata.name,
          email: formdata.email,
          password: formdata.password,
          phone: formdata.phone,
          address: formdata.address,
        }
        );
        console.log(data);
       if(data?.error){
        toast.error(data.error)
        console.log(data.error);
       }else{


        setauth({...auth,user: data?.updatedUser})
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    
  } catch (error) {
    console.log(error)
    toast.error("something went wrong");
  }
};

  return (
    <Layout title={"profile"}>
    <div className="flex col">
      <div className="mx-6 my-4">
        <UserMenu />
      </div>
      <section className="bg-gray-50 mx-10 dark:bg-gray-900 my-14 w-96"> 
        {/* <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"> */}
           <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Update User Profile
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="text"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Name
                  </label>
                  <input
                    value={formdata?.name ||'' }
                    onChange={(e) => setFormData({...formdata,  name: e.target.value })}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="your Name"
                    
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Email
                  </label>
                  <input
                    value={formdata?.email || '' }
                    onChange={(e) =>
                      setFormData({ ...formdata, email: e.target.value })
                    }
                    type="email"
                    name="email"
                    className="bg-gray-300 border  border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    disabled
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                     onChange={(e) =>
                      setFormData({ ...formdata, password: e.target.value })
                    }
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone
                  </label>
                  <input
                    value={formdata?.phone || ''}
                    onChange={(e) =>
                      setFormData({ ...formdata, phone: e.target.value })
                    }
                    type="phone"
                    name="phone"
                    placeholder="9876543210"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    
                  />
                </div>
                <div>
                  <label
                    htmlFor="text"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Address
                  </label>
                  <input
                    value={formdata?.address ||'' }
                    onChange={(e) =>
                      setFormData({ ...formdata, address: e.target.value })
                    }
                    type="text"
                    name="Address"
                    placeholder="abcd"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    
                  />
                </div>
            
                <button
                  type="submit"
                  className="w-full text-white bg-sky-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        {/* </div> */}
      </section>
    </div>
  </Layout>
  )
}


export default Profile