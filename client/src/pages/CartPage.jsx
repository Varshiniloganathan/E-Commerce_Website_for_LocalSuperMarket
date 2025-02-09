
import React, { useState, useEffect } from 'react';
import './CartPage.css';
import { Link } from 'react-router-dom';

const CartPage = ({ cartItems, removeFromCart }) => {
  // Initialize quantity for each item if not set already
  const [updatedCartItems, setUpdatedCartItems] = useState(
    cartItems.map((item) => ({
      ...item,
      quantity: item.quantity || 1, // Default quantity to 1 if not set
    }))
  );

  useEffect(() => {
    // Update local state when cartItems change from parent
    setUpdatedCartItems(
      cartItems.map((item) => ({
        ...item,
        quantity: item.quantity || 1, // Default quantity to 1 if not set
      }))
    );
  }, [cartItems]);

  // Function to update the quantity
  const updateQuantity = (id, quantity) => {
    const updatedItems = updatedCartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: parseInt(quantity, 10) }
        : item
    );
    setUpdatedCartItems(updatedItems); // Update the local state with the new quantity
  };

  // Function to calculate the total price
  const calculateTotal = () => {
    return updatedCartItems.reduce((total, item) => {
      const price = item.price ? parseFloat(item.price) : 0;
      const quantity = item.quantity ? parseInt(item.quantity, 10) : 0;
      return total + price * quantity;
    }, 0);
  };

  return (
    <>
      <h2>Your Cart</h2>
      <div className="cart-container">
        {updatedCartItems.length === 0 ? (
          <p>Your cart is empty. Start adding products to your cart!</p>
        ) : (
          <div className="cart-items">
            {updatedCartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="cart-item-price">₹{item.price}</div>
                </div>
                <div className="cart-item-quantity">
                  <select
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, e.target.value)}
                  >
                    {[...Array(10).keys()].map((num) => (
                      <option key={num} value={num + 1}>
                        {num + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="total-price">
          <h3>Total: ₹{calculateTotal()}</h3>
        </div>
      </div>
      <div className="cart-actions">
        <Link to="/" className="continue-shopping">
          Continue shopping
        </Link>
        <button className="checkout-button">Checkout</button>
      </div>
    </>
  );
};

export default CartPage;
