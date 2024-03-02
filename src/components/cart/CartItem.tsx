import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { CartType } from '../../types/Cart';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { addItem, deleteItem, removeItem } from '../../redux/slices/CartSlice';

const CartItem = ({ itemData }: { itemData: CartType }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const removeHandler = (itemData: CartType) => {
    console.log('item', itemData);
    dispatch(removeItem(itemData));
  };

  const addHandler = (itemData: CartType) => {
    dispatch(addItem({ ...itemData, amount: 1 }));
  };

  const deleteItemHandler = (itemData: CartType) => {
    dispatch(deleteItem(itemData));
  };

  const itemPageHandler = (id: number) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className='mb-6 pb-6 border-b border-b-ebony flex gap-5'>
      <div className='w-[120px] h-[120px] rounded-lg'>
        <img
          className='w-full h-full object-cover rounded-lg cursor-pointer'
          src={itemData.images[0]}
          alt={itemData.title}
          onClick={() => itemPageHandler(itemData?.id)}
        />
      </div>
      <div className='content flex-1'>
        <div className='flex justify-between mb-6 gap-5'>
          <h2
            className='text-lg font-medium cursor-pointer flex-1'
            onClick={() => itemPageHandler(itemData?.id)}
          >
            {itemData?.title}
          </h2>
          <span className='block font-medium text-lg w-[100px] text-right'>
            € {(itemData?.price * (itemData?.amount as number)).toFixed(2)}
          </span>
        </div>
        <div className='mb-5 flex gap-5'>
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
            className='btn-danger rounded-xl ml-auto'
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
