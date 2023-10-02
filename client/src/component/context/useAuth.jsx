//context import
import axios from "axios";
import  React, {createContext, useState,useContext,useEffect } from "react";

//create context
 const AuthContext = createContext();

//declire function
// context provider

 const AuthProvider = ({ children }) => {
  //declared state

  let [auth, setAuth] = useState({
    user: null,
    token: "",
    loginStatus: false,
  });

  axios.defaults.headers.common['Authorization']=auth?.token


  
useEffect(()=>{
  let data= localStorage.getItem("auth")

  if(data){
   const parseData=JSON.parse(data)
   setAuth({
     ...auth,
     user: parseData.user,
     token:  parseData.token,
     loginStatus:  parseData.loginStatus,
   })
  }

 },[])


  return(
  <AuthContext.Provider value={[ auth, setAuth ]}>
    {children}
  </AuthContext.Provider>
    )
};



//usecontext

const useAuth = () => {
  return useContext(AuthContext);
};

//export context
export {useAuth,AuthProvider};
