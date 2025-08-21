import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Home } from '../Pages/Home/Home'
import { TelaMensagens } from '../Pages/TelaMensagens/TelaMensagens'

export const RouterApp = () => {
  return (
    <BrowserRouter>
    <Routes>
        {localStorage.getItem("userName") === null ? (<Route path='/' element={<Home/>} />) : (<Route path='/' element={<TelaMensagens/>} />)  }
        
    </Routes>
    </BrowserRouter>
  )
}
