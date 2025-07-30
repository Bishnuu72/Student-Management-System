import React from 'react'
import Banner from '../components/Banner'
import About from './About'

const Home = ({darkMode, toggleTheme}) => {
  return (
    <div>
        <Banner  />
        <About darkMode={darkMode} toggleTheme={toggleTheme} />
    </div>
  )
}

export default Home
