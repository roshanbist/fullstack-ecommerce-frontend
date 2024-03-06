import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ContentWrapper from '../contentWrapper/ContentWrapper';
import { AppState, useAppDispatch } from '../../redux/store';
// import { updateUser } from '../../redux/slices/UserSlice';
import { toast } from 'react-toastify';
import GoBackButton from '../goBackButton/GoBackButton';
import { ProductType } from '../../types/Product';
import {
  fetchSingleProduct,
  updateSingleProduct,
} from '../../redux/slices/ProductSlice';
// import { uploadFileService } from '../../utils/uploadFileService';

const UpdateProduct = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const singleProduct = useSelector(
    (state: AppState) => state.products.selectedSingleProduct
  );

  const [updatedProductData, setUpdatedProductData] = useState(
    location.state?.productData || {}
  );

  // const [inputFile, setInputFile] = useState<File[]>([]);

  useEffect(() => {
    setUpdatedProductData(location.state?.productData || {});
  }, [location.state]);

  const fetchAllProductsMemoized = useCallback(() => {
    dispatch(fetchSingleProduct(Number(id)));
  }, [dispatch, id]);

  useEffect(() => {
    fetchAllProductsMemoized();
  }, [fetchAllProductsMemoized]);

  useEffect(() => {
    if (singleProduct) {
      setUpdatedProductData(singleProduct);
    }
  }, [id, singleProduct]);

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUpdatedProductData((prevData: ProductType) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let newUpdatedProductData: ProductType = updatedProductData;

      // if (inputFile.length > 0) {
      //   const inputFileUrl = inputFile && (await uploadFileService(inputFile));
      //   newUpdatedProductData = {
      //     ...newUpdatedProductData,
      //     images: inputFileUrl,
      //   };
      // }

      const differences: string[] = [];
      const keysToCheck = ['title', 'description', 'price'];

      for (const key of keysToCheck) {
        if (
          newUpdatedProductData[key as keyof ProductType] !==
          location.state?.productData[key as keyof ProductType]
        ) {
          differences.push(key);
        }
      }

      if (differences.length > 0) {
        const res = await dispatch(updateSingleProduct(newUpdatedProductData));
        if (res.meta.requestStatus === 'fulfilled') {
          navigate('/product-dashboard');
        }
      } else {
        toast.info('Data has not been changed');
      }
    } catch (e) {
      const error = e as Error;
      toast.error(error.message);
    }
  };

  return (
    <ContentWrapper>
      <div className='max-container py-[50px] animate-fade'>
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
                value={updatedProductData && updatedProductData?.title}
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
                value={updatedProductData && updatedProductData?.price}
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
                value={updatedProductData && updatedProductData?.description}
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
