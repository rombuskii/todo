import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
const Layout = ({children}) => {
  return (
    <div className='relative min-h-screen flex flex-col dark:bg-slate-900 dark:text-yellow-400 bg-white'>
    <Navbar/>
    <main className='p-1 flex-1 flex flex-col'>
    {children}
    </main>
    <Footer/>
    </div>
  )
}

export default Layout