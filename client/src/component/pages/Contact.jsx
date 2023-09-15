import React from 'react'
import { useParams,Outlet,Link } from 'react-router-dom'


function Contact() {
    let {id}=useParams()
    console.log(id)
  return (
    <div>
    <nav>
     <Link to="/contact/4200">contact Users</Link>
     <Link to="/contact/index">contact index</Link>
    <Outlet/>
    </nav>
  </div>

  )
}

export default Contact