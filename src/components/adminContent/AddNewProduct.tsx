import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import ContentWrapper from '../contentWrapper/ContentWrapper';
import { NewProductType, Size } from '../../types/Product';
import { AppState, useAppDispatch } from '../../redux/store';
import { uploadFileService } from '../../utils/uploadFileService';
import { createNewProduct } from '../../redux/slices/ProductSlice';
import GoBackButton from '../goBackButton/GoBackButton';
import { useSelector } from 'react-redux';
import { fetchAllCategories } from '../../redux/slices/CategorySlice';
import { productSize } from '../../constants';

const AddNewProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewProductType>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [inputFile, setInputFile] = useState<File[]>([]);
  const [sizeSelected, setSizeSelected] = useState<string[]>([]);

  const fileUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setInputFile(selectedFiles);
    }
  };

  const categories = useSelector(
    (state: AppState) => state.categories.categories
  );

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  // console.log('categories', categories);

  const onSubmit: SubmitHandler<NewProductType> = async (formData) => {
    try {
      const inputFileUrl = inputFile && (await uploadFileService(inputFile));

      console.log('formdata', formData);

      const newProductData: NewProductType = {
        title: formData.title,
        price: formData.price,
        description: formData.description,
        images: [...inputFileUrl],
        categoryId: formData.categoryId,
        size: formData.size,
      };

      const result = await dispatch(createNewProduct(newProductData));

      if (result.meta.requestStatus === 'fulfilled') {
        toast.success('Product added successfully');
        navigate('/product-dashboard');
        reset();
      } else if (result.meta.requestStatus === 'rejected') {
        toast.error('Error occurred. Please try again later');
      }
    } catch (e) {
      const error = e as Error;
      toast.error(error.message);
    }
  };

  return (
    <ContentWrapper>
      <div className='max-container'>
        <div className='max-container py-[50px]'>
          <div className='max-w-[870px] mx-auto px-[20px] md:px-[90px] p-8 md:p-16 bg-palette-ebony border border-palette-accent rounded-xl animate-fade'>
            <GoBackButton />
            <h1 className='mb-5 text-2xl md:text-3xl font-medium capitalize text-color-primary border-b pb-4'>
              Add new product
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className='pb-7'>
              <div className='mb-6'>
                <label
                  htmlFor='title'
                  className='block mb-2 font-medium text-color-primary'
                >
                  Title *
                </label>
                <input
                  className='form-input'
                  required
                  type='text'
                  id='title'
                  placeholder='Black Tshirt'
                  {...register('title', {
                    required: true,
                    minLength: 5,
                    maxLength: 50,
                  })}
                />
                {errors.title && (
                  <span className='form-error animate-fadein'>
                    Enter the title of the product correctly
                  </span>
                )}
              </div>
              <div className='mb-6'>
                <label
                  htmlFor='price'
                  className='block mb-2 font-medium text-color-primary'
                >
                  Price *
                </label>
                <input
                  className='form-input'
                  required
                  type='text'
                  id='price'
                  placeholder='0'
                  {...register('price', {
                    required: true,
                    min: 1,
                    max: 10000,
                    pattern: /^\d+$/,
                  })}
                />
                {errors.price && (
                  <span className='form-error animate-fadein'>
                    Price should be between 1 and 10000
                  </span>
                )}
              </div>
              <div className='mb-6'>
                <label
                  htmlFor='description'
                  className='block mb-2 font-medium text-color-primary'
                >
                  Description *
                </label>
                <textarea
                  className='form-input min-h-[50px] max-h-[100px]'
                  required
                  id='description'
                  placeholder='Product description'
                  {...register('description', {
                    required: true,
                    minLength: 20,
                    maxLength: 550,
                  })}
                />
                {errors.description && (
                  <span className='form-error animate-fadein'>
                    Description of product should be between 20 and 550
                    characters
                  </span>
                )}
              </div>
              <div className='mb-6'>
                <label
                  htmlFor='price'
                  className='block mb-2 font-medium text-color-primary'
                >
                  Category *
                </label>
                <select
                  {...register('categoryId', { required: true })}
                  className='form-input'
                >
                  <option value='' className='text-color-primary'>
                    Select category
                  </option>
                  {categories &&
                    categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                </select>
                {/* <input
                  className='form-input'
                  required
                  type='text'
                  id='categoryId'
                  placeholder='1'
                  {...register('categoryId', {
                    required: true,
                  })}
                /> */}
                {errors.categoryId && (
                  <span className='form-error animate-fadein'>
                    Category should be selected
                  </span>
                )}
              </div>
              <div className='mb-6'>
                <label
                  htmlFor='price'
                  className='block mb-2 font-medium text-color-primary'
                >
                  Size *
                </label>
                {/* <input
                  className='form-input'
                  required
                  type='text'
                  id='size'
                  placeholder='S'
                  {...register('size', {
                    required: true,
                  })}
                /> */}
                <ul
                  className='flex flex-wrap'
                  {...register('size', { required: true })}
                >
                  {productSize.map((size) => (
                    <li className='mr-3' key={size.label}>
                      <div className='flex items-center'>
                        <input
                          id={`checkbox-${size.label}`}
                          type='checkbox'
                          value=''
                          className='w-5 h-5 mr-2 border-color-primary bg-gray-100 rounded'
                        />
                        <label
                          htmlFor={`checkbox-${size.label}`}
                          className='font-medium text-color-primary'
                        >
                          {size.label}
                        </label>
                      </div>
                    </li>
                  ))}
                  {errors.size && (
                    <span className='form-error animate-fadein'>
                      Atleast one size should be selected
                    </span>
                  )}
                </ul>

                {/* {Object.keys(Size).map((size) => (
                  <li className={`mb-1`} key={size}>
                    <label
                      className={`relative flex items-center justify-center w-[50px] p-[10px] border-[2px] rounded-[5px] h-[50px] focus:outline-none uppercase shadow-sm cursor-pointer border-color-primary text-color-primary`}
                      htmlFor={size}
                    >
                      <input
                        type='checkbox'
                        id={size}
                        aria-labelledby='product-choice'
                        className='sr-only'
                        value={size}
                        // onChange={() => {
                        //   setSelectedSize(item);
                        //   setErrorMessage('');
                        // }}
                      />
                      <span className='text-lg max-sm:text-sm'>{size}</span>
                    </label>
                  </li>
                ))} */}
              </div>
              <div className='mb-6'>
                <label
                  className='block mb-2 font-medium text-color-primary'
                  htmlFor='file_input'
                >
                  Upload Image *
                </label>
                <input
                  className='file-input'
                  id='file_input'
                  type='file'
                  required
                  onChange={fileUploadHandler}
                  accept='images/*'
                  multiple
                />
                {errors.images && (
                  <span className='form-error animate-fadein'>
                    Upload valid images of the product
                  </span>
                )}
              </div>

              <button
                className='block btn-primary rounded-lg w-full'
                type='submit'
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default AddNewProduct;
