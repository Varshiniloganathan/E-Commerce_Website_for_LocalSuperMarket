import React, { useState } from 'react';
import {Outlet,Link} from "react-router-dom";
import './Navbar.css';
const Navbar =({products}) => {
    const [searchQuery,setSearchQuery] = useState('');
    const [filterProducts,setFilterProducts] = useState([]);
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
    
        if (query) {
          const filtered = products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
          );
          setFilterProducts(filtered);
        } else {
          setFilterProducts([]);
        }
      };
    return(
        <>
            <header className='navbar'>
                <div className='logo'>
                    <img src="logo.png" alt="logo"/>
                </div>
                <nav>
                    <ul>
                        <li>
                           <Link to="/" className='active'> Home</Link>
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
                    <input type="text" placeholder="🔍Search for an item"
                    value={searchQuery}
                    onChange={handleSearchChange}/>
                </div>
                </header>
                <Outlet />
        </>
    );
};
export default Navbar;