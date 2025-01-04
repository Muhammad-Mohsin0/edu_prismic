import React from 'react'
import Banner from '../Pages/Banner'
import About from '../Pages/About'
import Brands from '../Pages/Brands'
import Feature from '../Pages/Feature'
import Courses from '../Pages/Courses'
import Platform from '../Pages/Platform'
import NewsLetter from '../Pages/NewsLetter'
import Topics from '../Pages/Topics'
import Testimonials from '../Pages/Testimonials'
import TeamSection from '../Pages/Team'
import Blogs from '../Pages/Blogs'
import Footer from '../Pages/Footer'
import NotFoundPage from '../404Page'

const HomeOne = () => {
  return (
    <div>
      <Banner />
      <About />
      <Brands  />
      <Feature/>
      <Courses />
      <Platform/>
      <NewsLetter/>
      <Topics/>
      <Testimonials/>
      <TeamSection/>
      <Blogs/>
      <Footer/>
      <NotFoundPage/>
    </div>
  )
}

export default HomeOne
