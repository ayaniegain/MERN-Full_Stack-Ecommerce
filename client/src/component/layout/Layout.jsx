import React from 'react'
import Footer from './Footer'
import Header from './Header'
import Helmet from "react-helmet"
import  { Toaster } from 'react-hot-toast';



function Layout({children,title}) {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
        <Header/>
        <main className='flex flex-col min-h-screen '>
        <Toaster />
        {children}
        </main>
        <Footer/>
    </div>
  )
}
Layout.defautProps={
  title: "Ecommerce-app"
}

export default Layout