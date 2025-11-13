import React from 'react'
import Navbar from '../Components/Navbar'
import Header from '../Components/Header'
import Popularservices from '../Components/Popularservices'
import Joinus from '../Components/Joinus'
import Demandservices from '../Components/Demandservices'
import Community from '../Components/Community'
import Footer from '../Components/Footer'



function Home() {
  return (
    <div>
      <Navbar/>
      <Header/> 
      <Popularservices/>
      <Demandservices/>
         <Joinus/>
        <Community/>
       
         <Footer/> 
    </div>
  )
}

export default Home
