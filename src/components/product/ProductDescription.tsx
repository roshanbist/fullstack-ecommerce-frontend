import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

import { ProductType } from '../../types/Product';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { AppState, useAppDispatch } from '../../redux/store';
import { addItem } from '../../redux/slices/CartSlice';
import { getLoggedUserInfo } from '../../redux/slices/UserSlice';

const ProductDescription = ({ productData }: { productData: ProductType }) => {
  const [itemNumber, setItemNumber] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const dispatch = useAppDispatch();

  const loggedUserInfo = useSelector(
    (state: AppState) => state.users.loggedUser
  );

  const removeHandler = () => {
    setItemNumber((prevItem) => (prevItem !== 1 ? prevItem - 1 : prevItem));
  };

  const addHandler = () => {
    setItemNumber(itemNumber + 1);
  };

  const addToCartHandler = (item: ProductType) => {
    if (!selectedSize) {
      setErrorMessage('Please select the size');
      return;
    }

    dispatch(addItem({ ...item, amount: itemNumber, size: selectedSize }));
    setErrorMessage('');
  };

  useEffect(() => {
    if (!loggedUserInfo) {
      dispatch(getLoggedUserInfo());
    }
  }, [loggedUserInfo, dispatch]);

  return (
    <div className='sm:flex-1 p-3 md:p-5 text-color-primary sm:self-start'>
      <h1 className='text-xl md:text-2xl font-medium pb-4 mb-5 border-b border-color-primary tracking-wide'>
        {productData?.title}
      </h1>
      <span className='text-xl font-bold block mb-5'>
        <span className='text-sm'>As low as</span> €{' '}
        {productData.price.toFixed(2)}
      </span>
      <p className='tracking-wider mb-8'>{productData.description}</p>
      <div className='mb-8 '>
        <span className='text-xl block mb-4 font-medium'>Size</span>
        <ul className='flex flex-wrap gap-4'>
          {productData.size?.map((item, index) => (
            <li className={`mb-1`} key={item}>
              <label
                className={`relative flex items-center justify-center w-[50px] p-[10px] border-[2px] rounded-[5px] h-[50px] focus:outline-none uppercase shadow-sm cursor-pointer ${
                  selectedSize === item
                    ? 'border-blue-600 text-blue-600'
                    : 'border-color-primary text-color-primary'
                }`}
                htmlFor={`radio-list-${index + 1}`}
              >
                <input
                  type='radio'
                  name='size-radio'
                  id={`radio-list-${index + 1}`}
                  aria-labelledby='product-choice'
                  className='sr-only'
                  value={item}
                  onChange={() => {
                    setSelectedSize(item);
                    setErrorMessage('');
                  }}
                />
                <span className='text-lg max-sm:text-sm'>{item}</span>
              </label>
            </li>
          ))}
        </ul>
        {errorMessage && (
          <span className='text-sm text-red-500 italic pt-1 block'>
            {errorMessage}
          </span>
        )}
      </div>

      <div className='flex gap-4'>
        <div className='flex border border-color-primary items-center gap-x-4 py-4 px-6 rounded-xl'>
          <span
            className='icon-minus cursor-pointer text-color-primary'
            role='button'
            onClick={removeHandler}
          >
            <FontAwesomeIcon icon={faMinus} className='text-lg' />
          </span>
          <p className='w-4 text-center select-none font-medium'>
            {itemNumber}
          </p>
          <input type='hidden' name='quantity' value='1' />
          <span
            className='icon-plus cursor-pointer text-color-primary'
            role='button'
            onClick={addHandler}
          >
            <FontAwesomeIcon icon={faPlus} className='text-lg' />
          </span>
        </div>
        <button
          className='btn-primary w-full max-w-full rounded-xl'
          type='submit'
          onClick={() => addToCartHandler(productData)}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDescription;
