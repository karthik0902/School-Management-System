import './App.css';
import Parents from './Pages/parents';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import {  useState } from "react";
import Navbar from './component/Navbar/Navbar';
import { Sort } from '@mui/icons-material';
import { createContext } from 'react';
import Admin from './Pages/admin';
import UserContext from './component/UserContext/UserContext'








function App() {

 
  let [data1,setData1]=useState([])


  const nav = useNavigate();

  
  let routes;
  
   

    routes = (
      <Route path='/' element={<Navbar />} >
        <Route path="admin" element={<Admin />} />
        <Route path="parents" element={<Parents />} />
      </Route>
    )

  return (
    <UserContext.Provider value={{ data1,setData1}} >
      <Routes>
        {routes}
      </Routes>
    </UserContext.Provider>

  );
}

export default App;
