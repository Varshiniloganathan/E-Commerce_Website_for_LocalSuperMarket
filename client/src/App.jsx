import React,{useState} from 'react';
import {Routes,Route,useLocation} from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import Signin from './pages/Signin';
import './App.css';
//import Navbar from './components/Navbar';
function App() {
  const location = useLocation(); 
  const isNavbarVisible = location.pathname !== '/Signin';
  const [cartItems,setCartItems] = useState([]);
  const addToCart = (product) => {
    setCartItems((prevItems)=>[...prevItems,product]);
  };
  const removeFromCart=(id)=>{
    setCartItems(cartItems.filter(item=>item.id!==id));
  }

  return (
    <>
    <div className={`container ${isNavbarVisible ? '' : 'without-navbar'}`}>
    {isNavbarVisible && <Navbar />}  
    {location.pathname !== '/Signin' && <Navbar />} 
      <Routes>
      <Route path="/" element={<HomePage addToCart={addToCart}/>} />
      <Route path="/CartPage" element={<CartPage cartItems={cartItems} removeFromCart={removeFromCart}/>}/>
      <Route path="/Signin" element={<Signin/>}/>
    </Routes>
    </div>
    
    </>
  );
};

export default App;
