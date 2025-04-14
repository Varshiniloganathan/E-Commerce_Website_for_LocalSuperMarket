import './HomePage.css';
import React,{useEffect,useState} from "react";

const HomePage=({addToCart})=>{
    const [products,setProducts] = useState([]);
    useEffect(()=>{
        const fetchProducts = async()=>{
            try{
                const response = await fetch('http://localhost:5000/api/products');
                const data = await response.json();
                setProducts(data);
            }catch(error){
                console.error('Error fetching products:',error);
            }
        };
        fetchProducts();
    },[]);
    return(
        <>
        <div className="product-container">
            {products.map((product)=>(
                <div key={product._id} className="product-card">
                    <img src={product.image} alt={product.name} className="product-image"/>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>₹{product.price}</p>
                    <button onClick={()=> {
                        console.log('Adding to Cart:',product.name);
                        addToCart(product)
                    }}>Add to Cart</button>
                </div>
            ))}
        </div>
        </>
    );
};
export default HomePage;