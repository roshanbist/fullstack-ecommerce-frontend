import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import ContentWrapper from '../../contentWrapper/ContentWrapper';
import { AppState, useAppDispatch } from '../../../redux/store';
import GoBackButton from '../../goBackButton/GoBackButton';
import { ProductType } from '../../../types/Product';
import {
  fetchSingleProduct,
  updateSingleProduct,
} from '../../../redux/slices/ProductSlice';
import { uploadFileService } from '../../../utils/uploadFileService';
import { fetchAllCategories } from '../../../redux/slices/CategorySlice';
import { productSize } from '../../../constants';
import { sortSizes } from '../../../utils/api';

const UpdateProduct = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const singleProduct = useSelector(
    (state: AppState) => state.products.selectedSingleProduct
  );

  const categories = useSelector(
    (state: AppState) => state.categories.categories
  );

  const [updatedProductData, setUpdatedProductData] = useState(
    location.state?.productData || {}
  );

  useEffect(() => {
    setUpdatedProductData(location.state?.productData || {});
  }, [location.state]);

  const fetchAllProductsMemoized = useCallback(() => {
    dispatch(fetchSingleProduct(id as string));
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

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const handleCheckboxChange = (index: number, isChecked: boolean) => {
    const selectedSize = productSize[index];
    if (isChecked) {
      setUpdatedProductData((prevData: ProductType) => ({
        ...prevData,
        size: sortSizes([...prevData.size, selectedSize]),
      }));
    } else {
      setUpdatedProductData((prevData: ProductType) => ({
        ...prevData,
        size: prevData.size.filter((size) => size !== selectedSize),
      }));
    }
  };

  const imageUploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      const inputFileUrl = await uploadFileService(selectedFiles);
      setUpdatedProductData((prevData: ProductType) => ({
        ...prevData,
        images: inputFileUrl,
      }));
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setUpdatedProductData((prevData: ProductType) => ({
      ...prevData,
      categoryId: categoryId,
    }));
  };

  const submitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let newUpdatedProductData: ProductType = updatedProductData;

      console.log('new udpated prdouct data', newUpdatedProductData);

      // const selectedSortSize = sortSizes(selectedSizes);

      const differences: string[] = [];
      const keysToCheck = [
        'title',
        'description',
        'price',
        'categoryId',
        'images',
        'size',
      ];

      //  const initialProductData: ProductType | undefined =
      //    location.state?.productData;

      for (const key of keysToCheck) {
        if (
          newUpdatedProductData[key as keyof ProductType] !==
          location.state?.productData[key as keyof ProductType]
        ) {
          differences.push(key);
        }
      }

      console.log('difference', differences);

      if (differences.length > 0) {
        const res = await dispatch(updateSingleProduct(newUpdatedProductData));
        if (res.meta.requestStatus === 'fulfilled') {
          navigate('/product-dashboard');
        }
      } else {
        toast.info('Product information has not been changed');
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
            <div className='mb-6'>
              <label
                htmlFor='category'
                className='block mb-2 font-medium text-color-primary'
              >
                Category
              </label>
              <select
                className='form-input'
                id='category'
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                <option value='' className='text-color-primary'>
                  {updatedProductData.category.name}
                </option>
                {categories &&
                  categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className='mb-6'>
              <label className='block mb-2 font-medium text-color-primary'>
                Size
              </label>
              <div className='flex flex-wrap items-center'>
                {productSize.map((size, index) => (
                  <div key={index} className='mr-4 flex items-center'>
                    <input
                      type='checkbox'
                      id={`size-${size}`}
                      checked={updatedProductData.size.includes(
                        productSize[index]
                      )}
                      className='w-5 h-5 mr-2 border-color-primary bg-gray-100 rounded'
                      onChange={(e) =>
                        handleCheckboxChange(index, e.target.checked)
                      }
                    />
                    <label
                      className='font-medium text-color-primary'
                      htmlFor={`size-${size}`}
                    >
                      {size}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className='mb-6'>
              <label
                className='block mb-2 font-medium text-color-primary'
                htmlFor='images'
              >
                Update Product Image
              </label>
              <input
                className='file-input'
                id='images'
                type='file'
                onChange={imageUploadHandler}
                name='images'
                accept='images/*'
                multiple
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
