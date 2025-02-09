import './HomePage.css';
import React,{useEffect,useState} from "react";
const HomePage=({addToCart})=>{
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        fetch("/data/products.json").then((response)=>response.json()).then((data)=>setProducts(data)).catch((error)=>console.error("Error loading products:",error));
    },[]);
    return(
        <>
        <div className="product-container">
            {products.map((product)=>(
                <div key={product.id} className="product-card">
                    <img src={product.image} alt={product.name} className="product-image"/>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>₹{product.price}</p>
                    <button onClick={()=>addToCart(product)}>Add to Cart</button>
                </div>
            ))}
        </div>
        </>
    );
};
export default HomePage;