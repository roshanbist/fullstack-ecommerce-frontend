import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { AppState, useAppDispatch } from '../redux/store';
import { RegisterInputs } from '../types/User';
import ContentWrapper from '../components/contentWrapper/ContentWrapper';
import { uploadFileService } from '../utils/uploadFileService';
import { registerUser } from '../redux/slices/UserSlice';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [inputFile, setInputFile] = useState<File[]>([]);
  const errorMessage = useSelector((state: AppState) => state.users.error);

  const imageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setInputFile(selectedFiles);
    }
  };

  const onSubmit: SubmitHandler<RegisterInputs> = async (formData) => {
    try {
      const inputFileUrl = inputFile && (await uploadFileService(inputFile));

      const newUserData: RegisterInputs = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        avatar: inputFileUrl[0],
      };

      dispatch(registerUser(newUserData));
      toast.success('Customer register successfully');
      navigate('/login');
    } catch (error) {
      if (error && errorMessage) {
        toast.error(`Registration Failed. Please try again`);
      }
    }
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
              {errors.name && (
                <span className='form-error'>
                  Enter your name again, its too short
                </span>
              )}
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
              {errors.email && (
                <span className='form-error'>Enter your valid email</span>
              )}
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
                  minLength: 6,
                })}
              />
              {errors.password && (
                <span className='form-error'>
                  Password should be at-least 6 character
                </span>
              )}
            </div>
            <div className='mb-6'>
              <label
                className='block mb-2 font-medium text-color-primary'
                htmlFor='file_input'
              >
                Upload Image
              </label>
              <input
                className='file-input'
                id='file_input'
                type='file'
                onChange={imageChangeHandler}
                multiple
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
