import React from 'react';

const CartSummary = () => {
  return (
    <div className='p-5 md:p-10 bg-palette-ebony text-color-secondary rounded-lg w-[36%]'>
      <h1 className='text-xl font-medium tracking-wide mb-7'>Cart Summary</h1>
      <div>
        <p>Subtotal</p>
        <p></p>
      </div>
      <div>
        <p>Discount (10%)</p>
        <p></p>
      </div>
      <div>
        <p>Grand Total</p>
        <p></p>
      </div>
      <button className='btn-primary'>Checkout</button>
    </div>
  );
};

export default CartSummary;
