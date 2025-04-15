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
    /*return(
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
    );*/
    return (
      <div className="main-content">
        <div className="container mt-5">
          <h2 className="text-center mb-4">Welcome to Local SuperMarket</h2>
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4 mb-4">
                <div className="card h-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="card-img-top product-image"
                    
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">
                      <strong>Price:</strong> ₹{product.price}
                    </p>
                    <button
                      className="btn btn-primary w-100"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
          </div>
  );
};
export default HomePage;