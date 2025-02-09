import React from 'react';
import {Outlet,Link} from "react-router-dom";
import './Navbar.css';
const Navbar =() => {
    return(
        <header className='navbar'>
            <div className='logo'>
                <img src="logo.png" alt="logo"/>
            </div>
             <nav>
                <ul>
                    <li>
                       <Link to="/" class='active'> Home</Link>
                    </li>
                    <li>
                       <Link to="/CartPage">Cart</Link> 
                    </li>
                    <li>
                        <Link to="/Signin">SignIn/Register</Link>
                    </li>
                </ul>
                
            </nav>
            <div className='search-bar'>
                <input type="text" placeholder="🔍Search for an item"/>
            </div>
            <Outlet />

        </header>
           
    );
};
export default Navbar;