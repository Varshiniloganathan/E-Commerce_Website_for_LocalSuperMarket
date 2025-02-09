import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import Signin from './pages/Signin';
import './App.css';
//import Navbar from './components/Navbar';
function App() {

  return (
    <>
    <div className='container'>
      <Navbar/>
      <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/CartPage" element={<CartPage/>}/>
      <Route path="/Signin" element={<Signin/>}/>
    </Routes>
    </div>
    
    </>
  )
}

export default App;
