import React from "react";
import { useLocation } from "react-router-dom";
import './Checkout.css';
const Checkout =()=>{
    const location = useLocation();
    const {cartItems,totalPrice} = location.state;
    return(
        <div className="checkout-container">
            <h2>Checkout</h2>
            <h3>Order Details</h3>
            <div className="order-details">
                
                {cartItems.map((item)=>(
                    <div key={item.id} className="order-item">
                        <img src={item.image} alt={item.name} className="order-item-image" />
                        <div className="order-item-info">
                            <h4>{item.name}</h4>
                            <p>Quantity:{item.quantity}</p>
                            <p>Price:₹{item.price * item.quantity}</p>
                        </div>
                    </div>  
                    ))}
                    
                </div>
                <div className="total-price">
                        <h3>Total:₹{totalPrice}</h3>
                    </div>
                <div className="pickup-instructions">
                    <h3>Pickup Instructions</h3>
                    <p>Your order will be ready for pickup in 30 minutes.Please bring your order confirmation email when you arrive</p>
                </div>
            </div>
    );
}

export default Checkout;