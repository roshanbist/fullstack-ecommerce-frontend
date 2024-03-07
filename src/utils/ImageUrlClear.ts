import ProductPlaceholder from '../assets/images/productPlaceholder.png';

export const ImageUrlClear = (url: string) => {
  if (url) {
    if (url === '["https://placeimg.com/640/480/any"]') {
      return ProductPlaceholder;
    }

    if (url.slice(0, 2) === '["' && url.slice(-2) === '"]') {
      url = url.slice(2, -2);
      return url;
    } else if (url.slice(0, 2) === '["' && url.slice(-1) === '"') {
      url = url.slice(2, -1);
      return url;
    } else if (url.slice(0, 1) === '"' && url.slice(-1) === '"') {
      url = url.slice(1, -1);
      return url;
    } else if (url.slice(0, 1) === '"' && url.slice(-2) === '"]') {
      url = url.slice(1, -2);
      return url;
    }
    return url;
  } else {
    return ProductPlaceholder;
  }
};
