import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PasswordUpdate } from '../../types/User';
import { logoutUser, updatePassword } from '../../redux/slices/UserSlice';
import { useAppDispatch } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import { clearCart } from '../../redux/slices/CartSlice';
import GoBackButton from '../goBackButton/GoBackButton';

const UpdatePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordUpdate>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<PasswordUpdate> = async (formData) => {
    try {
      const newPasswordData: PasswordUpdate = {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      };

      const result = await dispatch(updatePassword(newPasswordData));
      if (result.meta.requestStatus === 'fulfilled') {
        // toast.success('Password changed successfully');
        // navigate('/');
        dispatch(logoutUser());
        dispatch(clearCart());
        navigate('/login');
        reset();
      }

      // else if (result.meta.requestStatus === 'rejected') {
      //   toast.error('Unable to change password. Please try again');
      // }
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
            Change Password
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className='pb-7'>
            <div className='mb-6'>
              <label
                htmlFor='oldPassword'
                className='block mb-2 font-medium text-color-primary'
              >
                Current password *
              </label>
              <input
                className='form-input'
                required
                type='password'
                id='oldPassword'
                placeholder='current password'
                {...register('oldPassword', {
                  required: true,
                })}
              />
              {errors.oldPassword && (
                <span className='form-error animate-fadein'>
                  Please enter your correct current password
                </span>
              )}
            </div>
            <div className='mb-6'>
              <label
                htmlFor='newPassword'
                className='block mb-2 font-medium text-color-primary'
              >
                New password *
              </label>
              <input
                className='form-input'
                required
                type='password'
                id='newPassword'
                placeholder='new password'
                {...register('newPassword', {
                  required: true,
                  minLength: 6,
                })}
              />
              {errors.newPassword && (
                <span className='form-error animate-fadein'>
                  Please enter minimum 6 length character
                </span>
              )}
            </div>
            <button
              className='block btn-primary rounded-lg w-full'
              type='submit'
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default UpdatePassword;
