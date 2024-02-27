import React, { useEffect, useState } from 'react';
import ContentWrapper from '../components/contentWrapper/ContentWrapper';
import { uploadFile } from '../hook/fileService';

const Profile = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // testing if url of image is received or not
  const fileUrlCheck = async () => {
    if (file) {
      const fileResult = await uploadFile(file);
      console.log('fileResult', fileResult);
    } else {
      console.log('File URL failed');
      //   throw file
    }
  };

  useEffect(() => {
    fileUrlCheck(); // Call the function directly within useEffect
  }, [file]);

  return (
    <ContentWrapper>
      <div className='max-container'>
        <div className='py-10'>
          <label
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            htmlFor='file_input'
          >
            Upload file
          </label>
          <input
            className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none'
            id='file_input'
            type='file'
            onChange={handleFileChange}
          />
        </div>
      </div>
    </ContentWrapper>
  );
};

export default Profile;
