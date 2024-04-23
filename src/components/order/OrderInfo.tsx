import React from 'react';
import { OrderList } from '../../types/orderList';

const OrderInfo = ({ order }: { order: OrderList }) => {
  return (
    <section className='mb-10 bg-palette-ebony border border-palette-accent rounded-xl p-[15px] md:p-[40px]'>
      <div className='flex flex-wrap justify-between border-b pb-5 mb-5'>
        <h4 className='font-medium text-lg text-color-primary mr-3'>
          Order: {order._id}
        </h4>
        <span className='d-block font-medium text-lg text-color-primary'>
          Order Total Amount: € {order.totalPrice}
        </span>
      </div>

      {order.items.map((item, index) => (
        <div className='flex flex-wrap justify-between' key={index}>
          <div className='w-full sm:w-[120px] h-[250px] sm:h-[120px] rounded-lg max-sm:mb-5'>
            <img
              className='w-full h-full object-cover rounded-lg cursor-pointer'
              src={item.images[0]}
              alt={order.title}
            />
          </div>
          <div className='flex-1'>
            <ul>
              <li>
                <span>Title</span>
                <span>titlename</span>
              </li>
              <li>
                <span>Quantity</span>
                <span>quantity</span>
              </li>
              <li>
                <span>Category</span>
                <span>category name</span>
              </li>

              <li>
                <span>size</span>
                <span>size name</span>
              </li>

              <li>
                <span>Total Price</span>
                <span>total price</span>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </section>
  );
};

export default OrderInfo;
