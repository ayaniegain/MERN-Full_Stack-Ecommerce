//context import
import  React, {createContext, useState,useContext } from "react";

//create context
 const SrarchContext = createContext();
 const  SrarchProvider = ({ children }) => {
  let [values, setvalues] = useState({
   keyword:'',
   results:[]
  });

  return(
  <SrarchContext.Provider value={[ values, setvalues ]}>
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
