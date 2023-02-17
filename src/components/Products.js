import React, { useState, useEffect } from 'react';
import {add} from '../store/cartSlice';
import {useDispatch} from 'react-redux';

const Products = () => {

    const dispatch = useDispatch();

    const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        console.log(data);

        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAdd = (product)=>{
    dispatch(add(product))
  }

  return <div className='productsWrapper'>
  {
    products.map(product =>(
        <div className='card' key={product.id}>
        <img src={product.image} alt="" />
        <h4>{product.title}</h4>
        <h5>{product.price}</h5>
        <div>-</div>
        <input value="1" type="number" />
        <div>+</div>
        <div>{" "}
        <button onClick={()=> handleAdd(product)} className='btn'> Add To cart</button>
        </div>
        <p>
        Status:{" "}
        <b className={product.stock < 1 ? "redColor": "greenColor"}>
        {product.stock < 1 ? "Out of Stock": "In Stock"}</b>
        </p>
        </div>
        
    ))
  }
  </div>;
};

export default Products;