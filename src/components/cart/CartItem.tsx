import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { CartType } from '../../types/Cart';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { addItem } from '../../redux/slices/CartSlice';

const CartItem = ({ itemData }: { itemData: CartType }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const removeHandler = () => {
    //
  };

  const addHandler = (itemData: CartType) => {
    dispatch(addItem({ ...itemData, amount: 1 }));
  };

  const removeCartHandler = (id: number) => {
    //
  };

  const itemPageHandler = (id: number) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className='mb-6 pb-6 border-b border-b-ebony flex gap-5'>
      <div className='w-[150px] min-h-[150px] rounded-lg'>
        <img
          className='w-full h-full object-cover rounded-lg cursor-pointer'
          src={itemData.images[0]}
          alt={itemData.title}
          onClick={() => itemPageHandler(itemData?.id)}
        />
      </div>
      <div className='content flex-1'>
        <div className='flex justify-between mb-5'>
          <h2
            className='text-lg font-medium cursor-pointer'
            onClick={() => itemPageHandler(itemData?.id)}
          >
            {itemData?.title}
          </h2>
          <span className='block font-medium'>
            € {itemData?.price.toFixed(2)}
          </span>
        </div>
        <div className='flex justify-between mb-5'>
          <span className='min-w-[35px] h-[35px] p-2 rounded-sm bg-blue-500 text-white flex justify-center items-center'>
            x {itemData?.amount}
          </span>
          <div className='flex justify-between gap-5'>
            <span
              className='icon-minus cursor-pointer text-sm w-[35px] h-[35px] bg-blue-500 hover:bg-blue-600 p-3 rounded-lg flex items-center justify-center text-white'
              role='button'
              onClick={removeHandler}
            >
              <FontAwesomeIcon icon={faMinus} className='text-lg' />
            </span>
            <span
              className='icon-minus cursor-pointer text-sm w-[35px] h-[35px] bg-blue-500 hover:bg-blue-600 p-3 rounded-lg flex items-center justify-center text-white'
              role='button'
              onClick={() => addHandler(itemData)}
            >
              <FontAwesomeIcon icon={faPlus} className='text-lg' />
            </span>
          </div>
        </div>
        <button
          className='btn-danger w-full max-w-full rounded-xl'
          type='submit'
          onClick={() => removeCartHandler(itemData?.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
