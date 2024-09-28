import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cart, setCart }) => {
  const [quantities, setQuantities] = useState(cart.map(() => 1));
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);

  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = Math.max(1, value);
    setQuantities(newQuantities);
  };

  const handleRemoveProduct = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    const newQuantities = quantities.filter((_, i) => i !== index);
    setCart(newCart);
    setQuantities(newQuantities);
  };

  const applyDiscount = () => {
    // สมมุติว่า 'DISCOUNT10' จะลดราคา 10%
    if (discountCode === 'DISCOUNT10') {
      setDiscountAmount(0.1); // ลด 10%
    } else {
      alert('Invalid discount code');
    }
  };

  const totalBeforeShipping = cart.reduce((total, product, index) => {
    return total + product.price * quantities[index];
  }, 0);
  const shippingCost = 100;
  const totalCost = totalBeforeShipping + shippingCost - (totalBeforeShipping * discountAmount);

  return (
    <>
      <div className="container my-5" style={{ width: "54%" }}>
        {cart.length === 0 ? (
          <div className='text-center'>
            <h1>Your Cart is Empty</h1>
            <Link to={"/"} className='btn btn-warning'>Continue Shopping...</Link>
          </div>
        ) : (
          cart.map((product, index) => {
            return (
              <div className="card mb-3 my-5" style={{ width: '500px' }} key={index}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img src={product.imgSrc} className="img-fluid rounded-start" alt="..." />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body text-center">
                      <h5 className="card-title">{product.title}</h5>
                      <p className="card-text">{product.description}</p>
                      <div className="d-flex justify-content-center align-items-center">
                        <input
                          type="number"
                          value={quantities[index]}
                          onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                          style={{ width: '70px', textAlign: 'center' }}
                        />  
                      </div>
                      <button className="btn btn-primary mx-3">{product.price * quantities[index]} ฿</button>
                      <button onClick={() => handleRemoveProduct(index)} className="btn btn-danger">Remove</button>
                      <button className="btn btn-warning">Buy Now</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {cart.length !== 0 && (
        <div className="container text-center my-5">
          <div>
            <input 
              type="text" 
              value={discountCode} 
              onChange={(e) => setDiscountCode(e.target.value)} 
              placeholder="Enter discount code" 
            />
            <button onClick={applyDiscount} className='btn btn-success'>Apply</button>
          </div>
          <div className="my-3">
            <h5>Total Before Shipping: {totalBeforeShipping} ฿</h5>
            <h5>Shipping Cost: {shippingCost} ฿</h5>
            <h5>Discount: {discountAmount * 100}%</h5>
            <h4>Total Cost: {totalCost.toFixed(2)} ฿</h4>
          </div>
          <button className='btn btn-warning mx-5'>CheckOut</button>
          <button onClick={() => setCart([])} className='btn btn-danger'>Clear Cart</button>
        </div>
      )}
    </>
  );
};

export default Cart;


