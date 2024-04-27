import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CategoryBase } from '../../../types/Category';
import { useAppDispatch } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';
import ContentWrapper from '../../contentWrapper/ContentWrapper';
import GoBackButton from '../../goBackButton/GoBackButton';
import { uploadFileService } from '../../../utils/uploadFileService';
import { createNewCategory } from '../../../redux/slices/CategorySlice';
import { toast } from 'react-toastify';

const AddNewCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryBase>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [inputFile, setInputFile] = useState<File[]>([]);

  const fileUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setInputFile(selectedFiles);
    }
  };

  const onSubmit: SubmitHandler<CategoryBase> = async (formData) => {
    try {
      const inputFileUrl = inputFile && (await uploadFileService(inputFile));

      const newCategoryData: CategoryBase = {
        name: formData.name,
        image: inputFileUrl[0],
      };

      const result = await dispatch(createNewCategory(newCategoryData));

      if (result.meta.requestStatus === 'fulfilled') {
        toast.success('Category added successfully');
        navigate('/admin/category-dashboard');
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
              Add new category
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className='pb-7'>
              <div className='mb-6'>
                <label
                  htmlFor='title'
                  className='block mb-2 font-medium text-color-primary'
                >
                  Name *
                </label>
                <input
                  className='form-input'
                  required
                  type='text'
                  id='name'
                  placeholder='category name'
                  {...register('name', {
                    required: true,
                    minLength: 5,
                    maxLength: 50,
                  })}
                />
                {errors.name && (
                  <span className='form-error animate-fadein'>
                    Enter the name of category greater than 5 character
                  </span>
                )}
              </div>
              <div className='mb-6'>
                <label
                  className='block mb-2 font-medium text-color-primary'
                  htmlFor='file_input'
                >
                  Upload Category Image *
                </label>
                <input
                  className='file-input'
                  id='file_input'
                  type='file'
                  required
                  onChange={fileUploadHandler}
                  accept='images/*'
                />
                {errors.image && (
                  <span className='form-error animate-fadein'>
                    Upload image of category
                  </span>
                )}
              </div>

              <button
                className='block btn-primary rounded-lg w-full'
                type='submit'
              >
                Add Category
              </button>
            </form>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default AddNewCategory;
