import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Details from '../components/Details'
import Home from '../components/Home'

const Main = () => {
  return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/details" element={<Details />} />
              </Routes>
          </BrowserRouter>
      </>
  )
}

export default Main