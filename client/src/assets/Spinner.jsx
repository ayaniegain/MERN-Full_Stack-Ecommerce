import React, { useState, useEffect } from "react";
import { useNavigate,useLocation, Navigate } from "react-router-dom";

function Spinner({path='login'}) {
  let natigate = useNavigate();
  let location =useLocation()

  // console.log(location)

  let [timer, setTimer] = useState(5);

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((prev) => --prev);
    }, 1000);
    timer == 0 && natigate(`/${path}`,{
        state:location.pathname
    });

    return () => {
      clearInterval(interval);
    };
  }, [timer,Navigate,location,path]);

  return (
    <div className="flex  justify-center  my-60">
      <div>
        <div
          className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
        <div
          className="inline-block h-12 w-12 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
      <br />
      <h2 className="text-green-600 text-3xl ">
        redirect to login page... {timer}
      </h2>
    </div>
  );
}

export default Spinner;
