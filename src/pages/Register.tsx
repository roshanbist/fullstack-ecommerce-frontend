import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { RegisterInputs } from '../types/User';
import ContentWrapper from '../components/contentWrapper/ContentWrapper';
import { Link } from 'react-router-dom';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>();

  const onSubmit: SubmitHandler<RegisterInputs> = () => {
    // alert(`Hi, the form has been successfully filled by ${formData.name}`);
    // reset();
  };

  return (
    <ContentWrapper>
      <div className='max-container py-[50px]'>
        <div className='max-w-[870px] mx-auto px-[90px] p-8 md:p-16 bg-palette-ebony border border-palette-accent rounded-xl'>
          <h1 className='mb-5 text-3xl font-medium capitalize text-color-primary border-b pb-4'>
            Become Customer
          </h1>
          <p className='text-color-primary text-lg mb-10'>
            If you are new to our Shoplyst, we are glad to have you as member.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className='pb-7'>
            <div className='mb-6'>
              <label
                htmlFor='fullName'
                className='block mb-2 font-medium text-color-primary'
              >
                Name *
              </label>
              <input
                className='form-input'
                required
                type='text'
                id='fullName'
                placeholder='John'
                {...register('name', {
                  required: true,
                  minLength: 2,
                  maxLength: 30,
                })}
              />
            </div>
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
              />
            </div>
            <button
              className='block btn-primary rounded-lg w-full'
              type='submit'
            >
              Register
            </button>
          </form>
          <p className='text-color-primary text-lg font-medium'>
            Already have an account ?{' '}
            <Link to='/login' className='text-blue-500 hover:text-blue-600'>
              Log In
            </Link>
          </p>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default Register;
