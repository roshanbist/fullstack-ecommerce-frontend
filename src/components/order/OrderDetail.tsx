import React, { useEffect } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';

import ContentWrapper from '../contentWrapper/ContentWrapper';

import Loader from '../loader/Loader';
import { AppState, useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { getSingleOrder } from '../../redux/slices/OrderSlice';
import GoBackButton from '../goBackButton/GoBackButton';

const OrderDetail = () => {
  const dispatch = useAppDispatch();
  const { orderId } = useParams();

  const { selectedSingleOrder, loading } = useSelector(
    (state: AppState) => state.orders
  );

  useEffect(() => {
    dispatch(getSingleOrder(orderId as string));
  }, [dispatch, orderId]);

  const priceBeforeDiscount =
    selectedSingleOrder &&
    (selectedSingleOrder.totalPrice / (1 - 10 / 100)).toFixed(2);

  return (
    <ContentWrapper>
      <div className='max-container py-10 md:py-12'>
        {loading ? (
          <Loader />
        ) : (
          selectedSingleOrder && (
            <div className='md:flex md:justify-between md:gap-5 lg:gap-7 xl:gap-10'>
              <div className='mb-10 flex-1 bg-palette-ebony border border-palette-accent rounded-xl py-[15px] md:py-[30px] self-start'>
                <div className='px-[15px] md:px-[30px]'>
                  <GoBackButton />
                </div>
                <div className='flex flex-wrap justify-between items-center border-b pb-5 mb-5 px-[15px] md:px-[30px]'>
                  <div className='text-color-primary font-medium'>
                    <h4>Order: {selectedSingleOrder._id}</h4>
                  </div>
                  <div className='font-medium text-color-primary'>
                    <span className='block'>
                      Order placed:{' '}
                      {moment(selectedSingleOrder.createdAt).format(
                        'DD MMMM YYYY'
                      )}
                    </span>
                  </div>
                </div>
                {selectedSingleOrder.items.map((item, index) => (
                  <div
                    className='flex flex-wrap justify-between px-[15px] md:px-[30px] border-b pb-5 mb-5'
                    key={index}
                  >
                    <div className='w-[120px] h-[120px] rounded-lg max-sm:mb-5 mr-5'>
                      <img
                        className='w-full h-full object-cover rounded-lg cursor-pointer'
                        src={item.images[0]}
                        alt={item.title}
                      />
                    </div>
                    <div className='flex-1 text-color-primary'>
                      <h4 className='font-medium mb-1'>{item.title}</h4>
                      <div className='mb-1'>Quantity: {item.amount}</div>
                      <div className='mb-1'>Size: {item.size}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className='md:w-[36%] self-start'>
                <div className='p-4 md:p-6 lg:p-7 border border-palette-accent bg-palette-ebony text-color-primary rounded-lg mb-5'>
                  <h1 className='text-lg font-medium tracking-wide mb-4 pb-4 border-b border-b-ebony'>
                    Delivery Address
                  </h1>
                  <p className='tracking-wide mb-2 capitalize font-medium'>{`${selectedSingleOrder.user.firstname} ${selectedSingleOrder.user.lastname}`}</p>
                  <p className='tracking-wide mb-2 capitalize'>
                    {selectedSingleOrder.shippingAddress}
                  </p>
                </div>
                <div className='p-4 md:p-6 border border-palette-accent bg-palette-ebony text-color-primary rounded-lg '>
                  <h1 className='text-lg font-medium tracking-wide mb-4 4 pb-4 border-b border-b-ebony'>
                    Order Summary
                  </h1>
                  <div className='mb-3 flex justify-between'>
                    <p className='tracking-wide'>Total</p>
                    <p>€ {priceBeforeDiscount}</p>
                  </div>
                  <div className='mb-3 flex justify-between'>
                    <p className='tracking-wide'>Discount (10%)</p>
                    <p>- € {(0.1 * Number(priceBeforeDiscount)).toFixed(2)}</p>
                  </div>
                  <div className='mb-3 flex justify-between'>
                    <p className='tracking-wide font-bold'>Grand Total</p>
                    <p className='font-bold'>
                      € {selectedSingleOrder.totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </ContentWrapper>
  );
};

export default OrderDetail;
