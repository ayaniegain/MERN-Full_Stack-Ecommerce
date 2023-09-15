import React from 'react'
import Footer from './Footer'
import Header from './Header'

function Layout({children}) {
  return (
    <div>
        <Header/>
        <main className='flex flex-col min-h-screen'>
        {children}
        </main>
        <Footer/>
    </div>
  )
}

export default Layout