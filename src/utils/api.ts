export const BASE_URL = 'http://localhost:8080/api/v1';

export const sortSizes = (sizes: string[]) => {
  const sizeStr: { [key: string]: number } = {
    S: 0,
    M: 1,
    L: 2,
  };

  const sortedSizes = sizes.sort((a: string, b: string) => {
    return sizeStr[a] - sizeStr[b];
  });

  return sortedSizes;
};
