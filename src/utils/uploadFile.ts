import axios, { AxiosError, AxiosResponse } from 'axios';

export type FileType = {
  originalName: string;
  fileName: string;
  location: string;
};

const URL = 'https://api.escuelajs.co/api/v1/files/upload';

export const uploadFile = async (fileData: File) => {
  try {
    const formData = new FormData();
    formData.append('file', fileData);

    const response: AxiosResponse<FileType> = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const { location } = response.data;

    // if (!location || response.status !== 201) {
    //   throw new Error('response invalid');
    // }

    return location;
  } catch (e) {
    const error = e as AxiosError;
    return error.message;
  }
};
