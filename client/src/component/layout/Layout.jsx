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
        <div className="text-white tracking-wide text-center bg-blue-500 sm:bg-green-500 md:bg-red-500 lg:bg-yellow-500 xl:bg-pink-500">
        Crazy  exclusive  deal!  just  one  click 👍
</div>
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