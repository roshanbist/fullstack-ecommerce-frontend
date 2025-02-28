import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { CartType } from '../../types/Cart';
import { useAppDispatch } from '../../redux/store';
import { addItem, deleteItem, removeItem } from '../../redux/slices/CartSlice';
import { ImageUrlClear } from '../../utils/ImageUrlClear';

const CartItem = ({ itemData }: { itemData: CartType }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const productImage = ImageUrlClear(itemData.images[0]);

  const removeHandler = (itemData: CartType) => {
    dispatch(removeItem(itemData));
  };

  const addHandler = (itemData: CartType) => {
    dispatch(addItem({ ...itemData, amount: 1 }));
  };

  const deleteItemHandler = (itemData: CartType) => {
    dispatch(deleteItem(itemData));
  };

  const itemPageHandler = (id: string) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className='mb-5 lg:mb-6 pb-5 lg:pb-6 border-b border-b-ebony sm:flex sm:gap-3 lg:gap-5'>
      <div className='w-full sm:w-[120px] h-[250px] sm:h-[120px] rounded-lg max-sm:mb-5'>
        <img
          className='w-full h-full object-cover rounded-lg cursor-pointer'
          src={productImage}
          alt={itemData.title}
          onClick={() => itemPageHandler(itemData?._id)}
        />
      </div>
      <div className='sm:flex-1'>
        <div className='sm:flex sm:justify-between mb-5 sm:mb-6 md:gap-3 lg:gap-4'>
          <h2
            className='lg:text-lg font-medium cursor-pointer flex-1'
            onClick={() => itemPageHandler(itemData?._id)}
          >
            {itemData?.title}
          </h2>
          <span className='block font-medium lg:text-lg sm:w-[100px] sm:text-right'>
            € {(itemData?.price * (itemData?.amount as number)).toFixed(2)}
          </span>
        </div>
        <div className='mb-5 flex gap-4 flex-wrap'>
          {itemData?.size && itemData?.size?.length > 0 && (
            <span className='w-[40px] h-[40px] p-3 bg-blue-500 rounded-md text-white flex justify-center items-center'>
              {itemData.size}
            </span>
          )}
          <span className='w-[80px] h-[35px] p-5 rounded-full bg-blue-500 text-white flex justify-center items-center'>
            x {itemData?.amount}
          </span>
          <div className='flex justify-between items-center bg-blue-500 rounded-full p-5 min-w-[100px] h-[35px] text-white'>
            <span
              className='icon-minus cursor-pointer text-sm'
              role='button'
              onClick={() => removeHandler(itemData)}
            >
              <FontAwesomeIcon icon={faMinus} className='text-lg' />
            </span>
            <span
              className='icon-minus cursor-pointer text-sm'
              role='button'
              onClick={() => addHandler(itemData)}
            >
              <FontAwesomeIcon icon={faPlus} className='text-lg' />
            </span>
          </div>
          <button
            className='btn-danger max-sm:w-full rounded-xl lg:ml-auto'
            type='submit'
            onClick={() => deleteItemHandler(itemData)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
