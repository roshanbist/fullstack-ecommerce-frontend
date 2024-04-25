import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ContentWrapper from '../../contentWrapper/ContentWrapper';
import { AppState, useAppDispatch } from '../../../redux/store';
import {
  fetchSingleCategory,
  updateSingleCategory,
} from '../../../redux/slices/CategorySlice';
import { Category } from '../../../types/Category';
import { uploadFileService } from '../../../utils/uploadFileService';
import { toast } from 'react-toastify';
import GoBackButton from '../../goBackButton/GoBackButton';

const UpdateCategory = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const singleCategory = useSelector(
    (state: AppState) => state.categories.selectedSingleCategory
  );

  useEffect(() => {
    if (!singleCategory) {
      dispatch(fetchSingleCategory(id as string));
    }
  }, [dispatch, id, singleCategory]);

  const [updatedCategoryData, setUpdatedCategoryData] = useState(
    location.state?.categoryData || {}
  );

  useEffect(() => {
    setUpdatedCategoryData(location.state?.categoryData || {});
  }, [location.state]);

  //   const fetchAllCategoryMemoized = useCallback(() => {
  //     dispatch(fetchSingleCategory(id as string));
  //   }, [dispatch, id]);

  //   useEffect(() => {
  //     fetchAllCategoryMemoized();
  //   }, [fetchAllCategoryMemoized]);

  //   useEffect(() => {
  //     if (singleCategory) {
  //       setUpdatedCategoryData(singleCategory);
  //     }
  //   }, [id, singleCategory]);

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUpdatedCategoryData((prevData: Category) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const imageUploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      const inputFileUrl = await uploadFileService(selectedFiles);
      setUpdatedCategoryData((prevData: Category) => ({
        ...prevData,
        image: inputFileUrl[0],
      }));
    }
  };

  const submitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let newUpdatedCategoryData: Category = updatedCategoryData;

      console.log('new udpated prdouct data', newUpdatedCategoryData);

      // const selectedSortSize = sortSizes(selectedSizes);

      const differences: string[] = [];
      const keysToCheck = ['name', 'image'];

      for (const key of keysToCheck) {
        if (
          newUpdatedCategoryData[key as keyof Category] !==
          location.state?.categoryData[key as keyof Category]
        ) {
          differences.push(key);
        }
      }

      console.log('difference', differences);

      if (differences.length > 0) {
        const res = await dispatch(
          updateSingleCategory(newUpdatedCategoryData)
        );
        if (res.meta.requestStatus === 'fulfilled') {
          navigate('/category-dashboard');
        }
      } else {
        toast.info('Category information has not been changed');
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
            Update Category Information
          </h1>

          <form className='pb-7' onSubmit={submitHandler}>
            <div className='mb-6'>
              <label
                htmlFor='name'
                className='block mb-2 font-medium text-color-primary'
              >
                Name
              </label>
              <input
                className='form-input'
                type='text'
                id='name'
                name='name'
                value={updatedCategoryData && updatedCategoryData?.name}
                onChange={inputChangeHandler}
              />
            </div>
            <div className='mb-6'>
              <label
                className='block mb-2 font-medium text-color-primary'
                htmlFor='image'
              >
                Update Category Image
              </label>
              <input
                className='file-input'
                id='image'
                type='file'
                onChange={imageUploadHandler}
                name='image'
                accept='images/*'
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

export default UpdateCategory;
