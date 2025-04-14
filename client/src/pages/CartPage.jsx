
import React, { useState, useEffect } from 'react';
import './CartPage.css';
import { Link,useNavigate } from 'react-router-dom';

/*const CartPage = ({ cartItems, removeFromCart }) => {
  // Initialize quantity for each item if not set already
  const [updatedCartItems, setUpdatedCartItems] = useState(
    cartItems.map((item) => ({
      ...item,
      quantity: item.quantity || 1, // Default quantity to 1 if not set
    }))
  );
  const navigate = useNavigate();
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
  const handleCheckout = () => {
    if (updatedCartItems.length === 0) {
      alert('Your cart is empty. Start adding products to your cart!');
    } else {
      navigate('/checkout', {
        state: {
          cartItems: updatedCartItems,
          totalPrice: calculateTotal(),
        },
      });
    }
  };*/
  const CartPage = () => {
    const [updatedCartItems, setUpdatedCartItems] = useState([]); // State to store cart items
    const navigate = useNavigate();
  
    // Fetch cart items from the backend
    useEffect(() => {
      const fetchCartItems = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/cart'); // Backend API to get cart items
          const data = await response.json();
          setUpdatedCartItems(data); // Update state with fetched cart items
        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      };
  
      fetchCartItems();
    }, []);
  
    // Function to update the quantity
    const updateQuantity = async (id, quantity) => {
      const updatedItems = updatedCartItems.map((item) =>
        item._id === id
          ? { ...item, quantity: parseInt(quantity, 10) }
          : item
      );
      setUpdatedCartItems(updatedItems); // Update the local state
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

  // Function to calculate the total price
  const calculateTotal = () => {
    return updatedCartItems.reduce((total, item) => {
      const price = item.price ? parseFloat(item.price) : 0;
      const quantity = item.quantity ? parseInt(item.quantity, 10) : 0;
      return total + price * quantity;
    }, 0);
  };
    // Function to handle checkout
    const handleCheckout = () => {
      if (updatedCartItems.length === 0) {
        alert('Your cart is empty. Start adding products to your cart!');
      } else {
        navigate('/checkout', {
          state: {
            cartItems: updatedCartItems,
            totalPrice: calculateTotal(),
          },
        });
      }
    };
  
    // Function to remove an item from the cart
    const removeFromCart = async (id) => {
      try {
        await fetch(`http://localhost:5000/api/cart/${id}`, {
          method: 'DELETE',
        });
        setUpdatedCartItems(updatedCartItems.filter((item) => item._id !== id)); // Update local state
      } catch (error) {
        console.error('Error removing item:', error);
      }
    };

  return (
    <>
      <div className="cart-container">
      <h2>Your Cart</h2>
        {updatedCartItems.length === 0 ? (
          <p>Your cart is empty. Start adding products to your cart!</p>
        ) : (
          <div className="cart-items">
            {updatedCartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="cart-item-price">₹{item.price}</div>
                </div>
                <div className="cart-item-quantity">
                  <select
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item._id, e.target.value)}
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
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
       
      </div>
      <div className="total-price">
          <h3>Total: ₹{calculateTotal()}</h3>
        </div>
      <div className="cart-actions">
        <Link to="/" className="continue-shopping">
          Continue shopping
        </Link>
        <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
      </div>
    </>
  );
};

export default CartPage;
