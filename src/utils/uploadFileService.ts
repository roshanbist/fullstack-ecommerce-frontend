import { uploadFile } from './uploadFile';

export const uploadFileService = async (files: File[]) => {
  const imageUrls = files.map(uploadFile);
  return Promise.all(imageUrls);
};
