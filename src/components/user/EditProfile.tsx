import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import ContentWrapper from '../contentWrapper/ContentWrapper';
import { AppState, useAppDispatch } from '../../redux/store';
import { getSingleUser, updateUser } from '../../redux/slices/UserSlice';
import { UserType } from '../../types/User';
import GoBackButton from '../goBackButton/GoBackButton';
import { uploadFileService } from '../../utils/uploadFileService';

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const userData = useSelector((state: AppState) => state.users.loggedUser);
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    if (!userData) {
      dispatch(getSingleUser(id as string));
    }
  }, [dispatch, id, userData]);

  const [updatedData, setUpdatedData] = useState(
    location.state?.loggedUserInfo || {}
  );

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedData((prevData: UserType) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    setUpdatedData(location.state?.loggedUserInfo || {});
  }, [location.state]);

  const imageChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);

      const inputFileUrl = await uploadFileService(selectedFiles);
      setUpdatedData((prevData: UserType) => ({
        ...prevData,
        avatar: inputFileUrl[0],
      }));
    }
  };

  const submitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let userNewData: UserType = updatedData;

      const differences: string[] = [];

      const keysToCheck = [
        'firstname',
        'lastname',
        'username',
        'address',
        'avatar',
      ];

      for (const key of keysToCheck) {
        if (
          userNewData[key as keyof UserType] !==
          location.state?.loggedUserInfo[key as keyof UserType]
        ) {
          differences.push(key);
        }
      }

      if (differences.length > 0) {
        const res = await dispatch(updateUser(userNewData as UserType));
        if (res.meta.requestStatus === 'fulfilled') {
          navigate(`/${userRole === 'admin' ? 'admin' : 'customer-profile'}`);
        }
      } else {
        toast.info('User has made no information changes');
      }
    } catch (e) {
      const error = e as Error;
      toast.error(error.message);
    }
  };

  return (
    <ContentWrapper>
      <div className='max-container py-[50px]'>
        <div className='max-w-[870px] mx-auto px-[20px] md:px-[90px] p-8 md:p-16 bg-palette-ebony border border-palette-accent rounded-xl animate-fade'>
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
                htmlFor='firstname'
                className='block mb-2 font-medium text-color-primary'
              >
                First Name
              </label>
              <input
                className='form-input'
                type='text'
                id='firstname'
                name='firstname'
                value={updatedData && updatedData?.firstname}
                onChange={inputChangeHandler}
              />
            </div>
            <div className='mb-6'>
              <label
                htmlFor='lastname'
                className='block mb-2 font-medium text-color-primary'
              >
                Last Name
              </label>
              <input
                className='form-input'
                type='text'
                id='lastname'
                name='lastname'
                value={updatedData && updatedData?.lastname}
                onChange={inputChangeHandler}
              />
            </div>
            <div className='mb-6'>
              <label
                htmlFor='username'
                className='block mb-2 font-medium text-color-primary'
              >
                Username
              </label>
              <input
                className='form-input'
                type='text'
                id='username'
                name='username'
                value={updatedData && updatedData?.username}
                onChange={inputChangeHandler}
              />
            </div>
            <div className='mb-6'>
              <label
                htmlFor='address'
                className='block mb-2 font-medium text-color-primary'
              >
                Address
              </label>
              <input
                className='form-input'
                type='text'
                id='address'
                name='address'
                value={updatedData && updatedData?.address}
                onChange={inputChangeHandler}
              />
            </div>
            <div className='mb-6'>
              <label
                className='block mb-2 font-medium text-color-primary'
                htmlFor='avatar'
              >
                Change Image
              </label>
              <input
                className='file-input'
                id='avatar'
                type='file'
                name='avatar'
                onChange={imageChangeHandler}
                accept='images/*'
              />
            </div>
            <button
              className='block btn-primary rounded-lg w-full'
              type='submit'
            >
              Update Profile
            </button>
          </form>

          <div>
            <button
              className='block btn-primary rounded-lg w-full'
              type='submit'
              onClick={() => navigate('/update-password')}
            >
              Change password
            </button>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default EditProfile;
