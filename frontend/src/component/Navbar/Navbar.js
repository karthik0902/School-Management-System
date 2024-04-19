import React from 'react'
import {NavLink, Outlet} from 'react-router-dom';
import classes from "./navbar.css"

function Navbar() {
  return (
    <div >
      <div className='nav'>
        <NavLink className="link" to="admin">Admin</NavLink> &nbsp;
        <NavLink className="link" to="parents">Parents</NavLink> &nbsp;
        

        </div>
        <Outlet/>
    </div>
  )
}

export default Navbar