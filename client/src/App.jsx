import React,{useState,useEffect} from 'react';
import {Routes,Route,useLocation} from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import Signin from './pages/Signin';
import Checkout from './pages/Checkout';
import './App.css';
//import Navbar from './components/Navbar';
function App() {
  const location = useLocation(); 
  const isNavbarVisible = location.pathname !== '/Signin';
  const [cartItems,setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/data/products.json")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error loading products:", error));
  }, []);
  const addToCart = (product) => {
    setCartItems((prevItems)=>[...prevItems,product]);
  };
  const removeFromCart=(id)=>{
    setCartItems(cartItems.filter(item=>item.id!==id));
  }

  return (
    <>
    <div className={`container ${isNavbarVisible ? '' : 'without-navbar'}`}>
      {isNavbarVisible && <Navbar products={products}/>}  
    
      <Routes>
      <Route path="/" element={<HomePage products={products} addToCart={addToCart}/>} />
      <Route path="/CartPage" element={<CartPage cartItems={cartItems} removeFromCart={removeFromCart}/>}/>
      <Route path="/Signin" element={<Signin/>}/>
      <Route path='/Checkout' element={<Checkout />}/>
    </Routes>
    </div>
    
    </>
  );
};

export default App;
