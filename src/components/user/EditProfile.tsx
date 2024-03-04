import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ContentWrapper from '../contentWrapper/ContentWrapper';
import { AppState, useAppDispatch } from '../../redux/store';
import { getLoggedUserInfo, updateUser } from '../../redux/slices/UserSlice';
import { UserType } from '../../types/User';
import { toast } from 'react-toastify';
import GoBackButton from '../goBackButton/GoBackButton';

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state: AppState) => state.users.loggedUser);

  useEffect(() => {
    if (!userData) {
      dispatch(getLoggedUserInfo());
    }
  }, [dispatch, userData]);

  const [updatedData, setUpdatedData] = useState<Partial<UserType>>({
    ...userData,
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await dispatch(updateUser(updatedData as UserType));
      if (res.meta.requestStatus === 'fulfilled') {
        navigate('/customer-profile');
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
            Update Profile Information
          </h1>
          <p className='text-color-primary text-lg mb-10'>
            If you want to update your profile information. Please fill the
            information below.
          </p>
          <form className='pb-7' onSubmit={submitHandler}>
            <div className='mb-6'>
              <label
                htmlFor='fullName'
                className='block mb-2 font-medium text-color-primary'
              >
                Name
              </label>
              <input
                className='form-input'
                type='text'
                id='fullName'
                name='name'
                value={updatedData && updatedData?.name}
                onChange={inputChangeHandler}
              />
            </div>
            <div className='mb-6'>
              <label
                htmlFor='email'
                className='block mb-2 font-medium text-color-primary'
              >
                Email
              </label>
              <input
                className='form-input'
                type='email'
                id='email'
                name='email'
                value={updatedData && updatedData?.email}
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

export default EditProfile;
