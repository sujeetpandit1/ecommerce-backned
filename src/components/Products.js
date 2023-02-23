import React, { useState, useEffect } from 'react';
import {add} from '../store/cartSlice';
import {useDispatch} from 'react-redux';

const Products = () => {

    const dispatch = useDispatch();

    const [products, setProducts] = useState([])
    const [quantity, setQuantity] = useState(1);
    const increaseQuantity = () => {
      if (products.Stock <= quantity) return;
  
      const qty = quantity + 1;
      setQuantity(qty);
    };
  
    const decreaseQuantity = () => {
      if (1 >= quantity) return;
  
      const qty = quantity - 1;
      setQuantity(qty);
    };
    const addToCartHandler = () => {
      dispatch(add(products));
    };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:4000/getProducts');
        const data = await res.json();
        console.log(data);

        setProducts(data.product)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return <div className='productsWrapper'>
  {
      Array.isArray(products) ? (
          products.map((product) => (
              <div className='card' key={product._id}>
              <img src={product.images[0].url} alt="" />
                  <h4>{product.name}</h4>
                  <h5> Rs. {product.price}</h5>
                  <div className='counter'>
                      <button onClick={decreaseQuantity}>-</button>
                      <input readOnly type="number" value={quantity}/>
                      <button onClick={increaseQuantity}>+</button>
                  </div>
                  <div><br/>
                      <button disabled={product.Stock < 1 ? true : false} onClick={addToCartHandler}> Add To cart</button>
                  </div>
                  <p>
                      Status:{" "}
                      <b>{product.stock < 1 ? "Out of Stock": "In Stock"}</b>
                  </p>
              </div>
          ))
      ) : (
          <p>Loading...</p>
      )
  }
</div>;
};

export default Products;