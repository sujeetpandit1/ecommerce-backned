import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { remove } from '../store/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems);
  
  const handleRemove = (product) => {
    dispatch(remove(product));
  };

  return (
    <div>
      <h3>Cart Items</h3>
      <br/>
      {cartItems.length === 0 ? (
        <p className='emptyCart'>Your cart is empty.</p>
      ) : (
        <div className="cartWrapper">
          {cartItems.map((product) => (
            <div className="cartCard" key={product._id}>
              <h4>{product.name}</h4>
              <h5>Price: {product.price}</h5>
              <button onClick={() => handleRemove(product._id)} className="btn">
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;