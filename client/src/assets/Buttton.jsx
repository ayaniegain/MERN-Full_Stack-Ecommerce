import React from 'react'

function Buttton({children,className,handlereset}) {
  return (
    <div>
        <button className={className} onClick={handlereset}>{children}</button>
    </div>
  )
}

export default Buttton