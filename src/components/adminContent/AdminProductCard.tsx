import React from 'react';

import { ProductType } from '../../types/Product';
import { useAppDispatch } from '../../redux/store';
import { deleteProduct } from '../../redux/slices/ProductSlice';
import { ImageUrlClear } from '../../utils/ImageUrlClear';
import { useNavigate } from 'react-router-dom';

const AdminProductCard = ({ productData }: { productData: ProductType }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const productImage = ImageUrlClear(productData.images[0]);

  const productDeleteHandler = (id: number) => {
    dispatch(deleteProduct(id));
  };

  // const productEditHandler = (id: number) => {
  //   console.log('please add id here', id);
  // };

  return (
    <div className='bg-palette-accent rounded-sm shadow-sm border border-palette-accent'>
      <div className='block h-[200px] w-full overflow-hidden'>
        <img
          className='object-cover w-full h-full rounded-tr-sm rounded-tl-sm'
          src={productImage}
          alt={productData.title}
        />
      </div>
      <div className='p-3 text-color-primary'>
        <h3 className='mb-2 font-medium'>{productData.title}</h3>
        <span className='block font-medium mb-4'>
          Price: € {productData.price.toFixed(2)}
        </span>
        <ul className='flex flex-wrap -mx-[5px]'>
          <li className='w-[50%] px-[5px]'>
            <button
              className='btn-primary min-w-0 w-full px-5 py-2 text-[14px] rounded-lg'
              onClick={() => navigate(`/update-product/${productData.id}`)}
            >
              Update
            </button>
          </li>
          <li className='w-[50%] px-[5px]'>
            <button
              className='btn-danger px-5 min-w-0 w-full text-[14px] rounded-lg'
              onClick={() => productDeleteHandler(productData.id)}
            >
              Delete
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminProductCard;
