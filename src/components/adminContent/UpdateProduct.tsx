import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ContentWrapper from '../contentWrapper/ContentWrapper';
import { AppState, useAppDispatch } from '../../redux/store';
import { updateUser } from '../../redux/slices/UserSlice';
import { toast } from 'react-toastify';
import GoBackButton from '../goBackButton/GoBackButton';
import {
  ProductType,
  ProductUpdate,
  UpdateFormDataType,
} from '../../types/Product';
import { fetchSingleProduct } from '../../redux/slices/ProductSlice';
import { uploadFileService } from '../../utils/uploadFileService';

const UpdateProduct = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const [productData, setProductData] = useState<Partial<ProductType>>({});
  const [inputFile, setInputFile] = useState<File[]>([]);

  const products = useSelector(
    (state: AppState) => state.products.selectedSingleProduct
  );

  const fetchAllProductsMemoized = useCallback(() => {
    dispatch(fetchSingleProduct(Number(id)));
  }, [dispatch, id]);

  useEffect(() => {
    fetchAllProductsMemoized();
  }, [fetchAllProductsMemoized]);

  useEffect(() => {
    if (products) {
      setProductData(products);
    }
  }, [id, products]);

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProductData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let updatedProductData = productData;

      if (inputFile.length > 0) {
        const inputFileUrl = inputFile && (await uploadFileService(inputFile));
        updatedProductData = { ...productData, images: inputFileUrl };
      }

      const newChanges: Partial<ProductType> = {};

      // Loop through productData to check for changes
      for (const key in updatedProductData) {
        // Check if the value has changed
        if (updatedProductData[key] !== products[key]) {
          newChanges[key] = updatedProductData[key];
        }
      }
    } catch (e) {
      const error = e as Error;
      toast.error(error.message);
    }
  };

  return (
    <ContentWrapper>
      <div className='max-container py-[50px]'>
        <div className='max-w-[870px] mx-auto px-[20px] md:px-[90px] p-8 md:p-16 bg-palette-ebony border border-palette-accent rounded-xl'>
          <GoBackButton />
          <h1 className='mb-5 text-2xl md:text-3xl font-medium capitalize text-color-primary border-b pb-4'>
            Update Product Information
          </h1>

          <form className='pb-7' onSubmit={submitHandler}>
            <div className='mb-6'>
              <label
                htmlFor='title'
                className='block mb-2 font-medium text-color-primary'
              >
                Title
              </label>
              <input
                className='form-input'
                type='text'
                id='title'
                name='title'
                value={(productData && productData?.title) || ''}
                onChange={inputChangeHandler}
              />
            </div>
            <div className='mb-6'>
              <label
                htmlFor='price'
                className='block mb-2 font-medium text-color-primary'
              >
                Price
              </label>
              <input
                className='form-input'
                type='text'
                id='price'
                name='price'
                value={(productData && productData?.price) || ''}
                onChange={inputChangeHandler}
              />
            </div>
            <div className='mb-6'>
              <label
                htmlFor='description'
                className='block mb-2 font-medium text-color-primary'
              >
                Description
              </label>
              <textarea
                className='form-input min-h-[150px] max-h-[300px]'
                required
                id='description'
                name='description'
                minLength={20}
                maxLength={550}
                value={(productData && productData?.description) || ''}
                onChange={inputChangeHandler}
              />
            </div>
            <button
              className='block btn-primary rounded-lg w-full'
              type='submit'
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default UpdateProduct;
