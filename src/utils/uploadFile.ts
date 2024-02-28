import axios, { AxiosError, AxiosResponse } from 'axios';

export type FileType = {
  originalName: string;
  fileName: string;
  location: string;
};

const URL = 'https://api.escuelajs.co/api/v1/files/upload';

export const uploadFile = async (fileData: File) => {
  try {
    const response: AxiosResponse<FileType> = await axios.post(URL, fileData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('response data', response.data);
    return response.data;
  } catch (error) {
    return error as AxiosError;
  }
};
