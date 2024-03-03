import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const GoBackButton = () => {
  const navigate = useNavigate();

  return (
    <div className='mb-5'>
      <button
        className='text-lg font-medium text-color-primary'
        onClick={() => navigate(-1)}
      >
        <FontAwesomeIcon icon={faArrowLeft} className='mr-2' /> Back
      </button>
    </div>
  );
};

export default GoBackButton;
