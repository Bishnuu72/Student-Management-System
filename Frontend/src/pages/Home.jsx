import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import About from './About'
import Contact from './Contact'

const Home = () => {
  return (
    <div>
        <Banner />
        <About />
        <Contact />
    </div>
  )
}

export default Home
