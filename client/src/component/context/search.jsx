//context import
import  React, {createContext, useState,useContext } from "react";

//create context
 const SrarchContext = createContext();
 const  SrarchProvider = ({ children }) => {
  let [auth, setAuth] = useState({
   keyword:'',
   results:[]
  });

  return(
  <SrarchContext.Provider value={[ auth, setAuth ]}>
    {children}
  </SrarchContext.Provider>
    )
};



//usecontext

const useSearch = () => {
  return useContext(SrarchContext);
};

//export context
export {useSearch,SrarchProvider};
