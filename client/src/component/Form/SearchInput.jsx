import React, { useState,useRef } from "react";
import { useSearch } from "../context/search";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
function SearchInput() {
  let [values, setValues] = useSearch();
  let [products, setProducts] = useState([]);
  const inputRef =useRef('')
  let [showSuggest,setShowsuggest]=useState(false)
  


  const natigate = useNavigate();

  const getAllProducts = async () => {
    try {
      let { data } = await axios.get(
        `http://localhost:8080/api/v1/product/getall-product`
      );

      let fldata = data.products.filter(
        (e) => e && e.name && e.name.toLowerCase().includes(values.keyword)
      );

      console.log(fldata);
      setProducts(fldata);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
      
      if (values.keyword) getAllProducts();
  }, [values.keyword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (values.keyword) {
        const { data } = await axios.get(
          `http://localhost:8080/api/v1/product/search/${
            values.keyword
          }`
        );
        setValues({ ...values, results: data });



        natigate("/search");
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleClick=(e)=>{

    // console.log(e);
    // setValues(e)
    // natigate("/search");
    inputRef.current.value=e.keyword
  }
    return (
    <>
      <form
        onSubmit={handleSubmit}
        className="pt-2  relative mx-auto text-gray-800"
      >
        <input
          className="border-2 border-gray-300 bg-white h-10  pr-16 rounded-lg text-sm focus:outline-none"
          type="search"
          name="search"
          ref={inputRef}
          placeholder="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          onFocus={()=>setShowsuggest(true)}
          onBlur={()=>setShowsuggest(false)}
        />
        <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
          <svg
            className="text-gray-800 h-6 w-5 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 56.966 56.966"
            style={{ enableBackground: "new 0 0 56.966 56.966" }}
            xmlSpace="preserve"
            width="512px"
            height="512px"
          >
            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
          </svg>
        </button>
        <div>
        {showSuggest   ?
        
        
          <div className="flex flex-col absolute bg-slate-100 w-full ">
            {products.map((e) => (
              <span  key={e.name}
                className="hover:bg-white text-sm mx-2 shadow-sm py-1"
                onClick={() => handleClick({ keyword: e.name })}

              >
                {e.name}
              </span>
            ))}
          </div>
        :
        <></>
        
        }
        </div>
      </form>

      
    </>
  );
}

export default SearchInput;