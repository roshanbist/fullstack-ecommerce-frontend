import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppState, useAppDispatch } from '../redux/store';
import { fetchSingleProduct } from '../redux/slices/ProductSlice';
import ContentWrapper from '../components/contentWrapper/ContentWrapper';

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();

  const id = Number(productId);

  const singleProductData = useSelector(
    (state: AppState) => state.products.selectedSingleProduct
  );

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  return (
    <ContentWrapper>
      <section className='py-10'>
        <div className='max-container'>
          <div>{singleProductData?.title}</div>
          <div>{singleProductData?.description}</div>
          <div>{singleProductData?.price}</div>
          <img src={singleProductData?.images[0]} alt='' />
        </div>
      </section>
    </ContentWrapper>
  );
};

export default ProductDetail;
