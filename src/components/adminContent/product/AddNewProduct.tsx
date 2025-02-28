import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import ContentWrapper from '../../contentWrapper/ContentWrapper';
import { NewProductType } from '../../../types/Product';
import { AppState, useAppDispatch } from '../../../redux/store';
import { uploadFileService } from '../../../utils/uploadFileService';
import { createNewProduct } from '../../../redux/slices/ProductSlice';
import GoBackButton from '../../goBackButton/GoBackButton';
import { fetchAllCategories } from '../../../redux/slices/CategorySlice';
import { productSize } from '../../../constants';
import { sortSizes } from '../../../utils/commonUtil';

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
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [showError, setShowError] = useState(false);

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

  const handleCheckboxChange = (index: number, isChecked: boolean) => {
    if (isChecked) {
      setSelectedSizes((prevSizes) => [...prevSizes, productSize[index]]);
      setShowError(false);
    } else {
      setSelectedSizes((prevSizes) =>
        prevSizes.filter((size) => size !== productSize[index])
      );
    }
  };

  const onSubmit: SubmitHandler<NewProductType> = async (formData) => {
    try {
      const inputFileUrl = inputFile && (await uploadFileService(inputFile));

      if (selectedSizes.length === 0) {
        setShowError(true);
        return;
      }

      const selectedSortSize = sortSizes(selectedSizes);

      const newProductData: NewProductType = {
        title: formData.title,
        price: formData.price,
        description: formData.description,
        images: [...inputFileUrl],
        categoryId: formData.categoryId,
        size: selectedSortSize,
      };

      const result = await dispatch(createNewProduct(newProductData));

      if (result.meta.requestStatus === 'fulfilled') {
        toast.success('Product added successfully');
        navigate('/admin/product-dashboard');
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
                <div className='flex flex-wrap items-center'>
                  {productSize.map((size, index) => (
                    <div key={index} className='mr-4 flex items-center'>
                      <input
                        type='checkbox'
                        id={`size-${size}`}
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
                  {showError && (
                    <span className='w-full block form-error animate-fadein'>
                      At least one size should be selected
                    </span>
                  )}
                </div>
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
