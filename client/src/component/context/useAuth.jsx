//context import
import axios from "axios";
import  React, {createContext, useState,useContext,useEffect } from "react";

//create context
 const ContextData = createContext();

//declire function
// context provider

 const ContextProvider = ({ children }) => {
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
  <ContextData.Provider value={[ auth, setAuth ]}>
    {children}
  </ContextData.Provider>
    )
};



//usecontext

const useContextData = () => {
  return useContext(ContextData);
};

//export context
export {useContextData,ContextProvider};
