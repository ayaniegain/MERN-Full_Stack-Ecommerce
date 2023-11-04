import React, {  useState } from 'react'
import Layout from '../../layout/Layout'
import { NavLink,useNavigate,useLocation, Link} from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast';
import  {useAuth}  from "../../context/useAuth";


function Login() {
  let [auth,setAuth] =useAuth()
  let location =useLocation()
  const navigate = useNavigate();
  const[data,setData]=useState({
    email:"",
    password:""
  })
  let handleSubmit=async(e)=>{
    e.preventDefault();

    try {
      let res=await  axios.post(`http://localhost:8080/api/v1/auth/login`,{
        email:data.email,
        password:data.password
      })
      if (res.data.success  ) {
        // console.log("user",res.data.user)
        // console.log("token",res.data.token)
        setAuth({
          ...auth,
          user:res.data.user,
          token:res.data.token,
          loginStatus: res.data.loginStatus
        })

        // useEffect(() => {
          localStorage.setItem("auth",JSON.stringify(res.data))
        // }, [auth]);

        setTimeout(() => {
          toast.success(res.data.message);
        }, 1000);
        navigate( location.state ||"/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  }
  return (
    <Layout title={"login"}>
   <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
   
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Sign in to your account
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input value={data.email} onChange={(e)=>setData({...data,email:e.target.value})} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input value={data.password} onChange={(e)=>setData({...data,password:e.target.value})}  type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div className="flex items-center justify-between">
            <Link to={"/forgot-password"}  className="text-sm font-medium text-blue-500 hover:underline dark:text-primary-500">Forgot password?</Link>
          </div>
          <button type="submit" className="w-full text-white bg-sky-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet? <NavLink to={"/register"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</NavLink>
          </p>
        </form>
      </div>
    </div>
  </div>
</section>

    </Layout>
  )
}

export default Login