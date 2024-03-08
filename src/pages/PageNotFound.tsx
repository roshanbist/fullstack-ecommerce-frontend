import React from 'react';
import { useNavigate } from 'react-router-dom';

import ContentWrapper from '../components/contentWrapper/ContentWrapper';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <ContentWrapper>
      <div className='animate-fade flex flex-wrap min-h-[100vh] flex-col items-center justify-center p-10 bg-[#164155] text-white'>
        <h1 className='text-[200px] font-bold mb-10 leading-[1]'>404</h1>
        <p className='font-medim text-2xl mb-8'>
          Oops, this page does not exist
        </p>
        <button
          className='btn-primary rounded-lg'
          onClick={() => navigate('/')}
        >
          Return Home
        </button>
      </div>
    </ContentWrapper>
  );
};

export default PageNotFound;
