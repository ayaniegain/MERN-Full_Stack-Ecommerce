import React, { useEffect, useState } from 'react'
import UserMenu from '../../layout/UserMenu'
import Layout from '../../layout/Layout'
import toast from "react-hot-toast";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/useAuth';

function Profile() {
  //context
  const [auth, setAuth] = useAuth();

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
  }, [auth?.user]);
  
  let handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let { data } = await axios.put(
        `/api/v1/auth/profile`,
        {
          name: formdata.name,
          email: formdata.email,
          password: formdata.password,
          phone: formdata.phone,
          address: formdata.address,
        }
      );
      
      if (data?.error) {
        toast.error(data.error);
      } else {
        setAuth({...auth, user: data?.updatedUser});
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Profile"}>
      {/* <div className="flex col"> */}
      <div className="flex md:flex-row flex-col md:justify-start md:items-start justify-center items-center">

        <div className="mx-6 my-4">
          <UserMenu />
        </div>
        <section className="bg-gray-50 mx-10 my-14 w-96">
          <div className="w-full bg-white rounded-lg shadow">
            <div className="p-6 space-y-4">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Update User Profile
              </h1>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="text"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your Name
                  </label>
                  <input
                    value={formdata?.name ||'' }
                    onChange={(e) => setFormData({...formdata, name: e.target.value })}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
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
                    className="bg-gray-300 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="name@company.com"
                    disabled
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900"
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  />
                </div>
                <div>
                  <label
                    htmlFor="text"
                    className="block mb-2 text-sm font-medium text-gray-900"
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  />
                </div>
            
                <button
                  type="submit"
                  className="w-full text-white bg-sky-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default Profile;
