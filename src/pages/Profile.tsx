import React, { useEffect, useState } from 'react';
import ContentWrapper from '../components/contentWrapper/ContentWrapper';
import { uploadFile } from '../utils/uploadFile';
import { uploadFileService } from '../utils/uploadFileService';

const Profile = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      //   setFile(e.target.files[0]);
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);
    }
  };

  // testing if url of image is received or not
  //   const fileUrlCheck = async () => {
  //     if (file) {
  //       const fileResult = await uploadFile(file);
  //       console.log('fileResult', fileResult);
  //     } else {
  //       console.error('File URL failed');
  //     }
  //   };

  //   useEffect(() => {
  //     fileUrlCheck();
  //   }, [file]);

  //   console.log('files haru aayo', files);

  const submitFileHandler = async () => {
    try {
      const imageUrl = await uploadFileService(files);

      console.log('image url aayo array ma', imageUrl);
    } catch (e) {
      console.error('Error:', e);
    }
  };

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
            multiple
          />
        </div>
        <button className='btn-primary' onClick={submitFileHandler}>
          generate url
        </button>
      </div>
    </ContentWrapper>
  );
};

export default Profile;
