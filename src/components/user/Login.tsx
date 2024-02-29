import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { LoginInputs } from '../../types/User';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import { Link, useNavigate } from 'react-router-dom';
import { AppState, useAppDispatch } from '../../redux/store';
import { loginUser } from '../../redux/slices/UserSlice';
import { useSelector } from 'react-redux';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state: AppState) => state.users);
  const loggedUserInfo = useSelector(
    (state: AppState) => state.users.loggedUser
  );

  const onSubmit: SubmitHandler<LoginInputs> = async (loginData) => {
    dispatch(loginUser(loginData));
    setInputFocus(true);
  };

  // check if loggedUser info and navigate accordingly
  useEffect(() => {
    if (loggedUserInfo) {
      const { role } = loggedUserInfo;

      if (role === 'customer') {
        navigate('/customer/profile');
      } else if (role === 'admin') {
        navigate('/admin');
      }
    } else {
      navigate('/login');
    }
  }, [loggedUserInfo, navigate]);

  return (
    <ContentWrapper>
      <div className='max-container py-[50px]'>
        <div className='max-w-[870px] mx-auto px-[20px] md:px-[90px] p-8 md:p-16 bg-palette-ebony border border-palette-accent rounded-xl'>
          <h1 className='mb-5 text-2xl md:text-3xl font-medium capitalize text-color-primary border-b pb-4'>
            Customer Login
          </h1>
          <p className='text-color-primary text-lg mb-10'>
            If you have an account, sign in with your email address.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className='pb-7'>
            {loading === 'failed' && inputFocus && (
              <span className='form-error animate-fadein mb-5'>{error}</span>
            )}
            <div className='mb-6'>
              <label
                htmlFor='email'
                className='block mb-2 font-medium text-color-primary'
              >
                Email *
              </label>
              <input
                className='form-input'
                required
                type='email'
                id='email'
                placeholder='john.doe@example.com'
                {...register('email', {
                  required: true,
                  pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                })}
                onFocus={() => setInputFocus(false)}
              />
            </div>
            <div className='mb-6'>
              <label
                htmlFor='password'
                className='block mb-2 font-medium text-color-primary'
              >
                Password *
              </label>
              <input
                className='form-input'
                required
                id='password'
                type='password'
                placeholder='password'
                {...register('password', {
                  required: true,
                })}
                onFocus={() => setInputFocus(false)}
              />
            </div>
            <button
              className='block btn-primary rounded-lg w-full'
              type='submit'
            >
              Login
            </button>
          </form>
          <p className='text-color-primary text-lg font-medium'>
            New customer?{' '}
            <Link to='/register' className='text-blue-500 hover:text-blue-600'>
              Create your account
            </Link>
          </p>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default Login;
