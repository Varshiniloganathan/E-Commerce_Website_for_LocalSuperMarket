import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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
  const addToCart = async (product) => {
    try {
      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product._id,
          name: product.name,
          price: product.price,
          description: product.description,
          image: product.image,
          quantity: 1, // Default quantity
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Item added to cart:', data);
        setCartItems((prevItems) => [...prevItems, data]); // Update local state with the new cart item
        alert('Item added to cart successfully!');
      } else {
        const errorData = await response.json();
        console.error('Error adding item to cart:', errorData);
        alert('Failed to add item to cart.');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      alert('An error occurred while adding the item to the cart.');
    }
  };
  const removeFromCart = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/cart/${id}`, {
        method: 'DELETE',
      });
      setCartItems((prevItems) => prevItems.filter((item) => item._id !== id)); // Update local state
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };
  const updateQuantity = async (id, quantity) => {
    const updatedItems = cartItems.map((item) =>
      item._id === id
        ? { ...item, quantity: parseInt(quantity, 10) }
        : item
    );
    setCartItems(updatedItems); // Update the local state
  
    // Update the quantity in the backend
    try {
      await fetch(`http://localhost:5000/api/cart/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: parseInt(quantity, 10) }),
      });
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  return (
    <>
    <div className={`container ${isNavbarVisible ? '' : 'without-navbar'}`}>
      {isNavbarVisible && <Navbar products={products}/>}  
    
      <Routes>
      <Route path="/" element={<HomePage products={products} addToCart={addToCart}/>} />
      <Route path="/CartPage" element={<CartPage cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity}/>}/>
      <Route path="/Signin" element={<Signin/>}/>
      <Route path='/Checkout' element={<Checkout />}/>
    </Routes>
    </div>
    
    </>
  );
};

export default App;
