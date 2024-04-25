import moment from 'moment';
import { Link } from 'react-router-dom';

import { OrderList } from '../../types/orderList';
import { useAppDispatch } from '../../redux/store';
import { deleteOrderById } from '../../redux/slices/OrderSlice';

const OrderInfo = ({ order }: { order: OrderList }) => {
  const dispatch = useAppDispatch();

  const orderDeleteHandler = async (id: string) => {
    await dispatch(deleteOrderById(id));
  };

  return (
    <>
      <section className='mb-10 bg-palette-ebony border border-palette-accent rounded-xl py-[15px] md:py-[30px]'>
        <div className='flex flex-wrap justify-between items-center border-b pb-5 mb-5 px-[15px] md:px-[30px]'>
          <div className='text-color-primary font-medium'>
            <h4>Order: {order._id}</h4>
            <span className='block'>
              Order placed: {moment(order.createdAt).format('DD MMMM YYYY')}
            </span>
          </div>
          <div className='font-medium text-color-primary'>
            <span className='block'>Order Total</span>
            <span className='block font-bold text-right'>
              € {order.totalPrice.toFixed(2)}
            </span>
          </div>
        </div>

        {order.items.map((item, index) => (
          <div
            className='flex flex-wrap justify-between px-[15px] md:px-[30px] border-b pb-4 mb-4'
            key={index}
          >
            <div className='w-[80px] h-[80px] rounded-sm max-sm:mb-5 md:mr-5'>
              <img
                className='w-full h-full object-cover rounded-sm cursor-pointer'
                src={item.images[0]}
                alt={item.title}
              />
            </div>
            <div className='flex-1 text-color-primary text-[15px]'>
              <h4 className='font-medium mb-1'>{item.title}</h4>
              <div className='mb-1'>Quantity: {item.amount}</div>
              <div className='mb-1'>Size: {item.size}</div>
            </div>
          </div>
        ))}
        <div className='py-[4px] px-[15px] md:px-[30px] flex flex-wrap justify-end gap-3'>
          <button
            className='btn-danger px-5 text-sm min-w-0 w-full sm:max-w-[200px] rounded-lg'
            onClick={() => orderDeleteHandler(order?._id)}
          >
            Delete Order
          </button>
          <Link
            className='btn-primary w-full max-w-full rounded-lg sm:max-w-[200px] text-sm'
            to={`/orders/${order._id}`}
          >
            View Order Details
          </Link>
        </div>
      </section>
    </>
  );
};

export default OrderInfo;
