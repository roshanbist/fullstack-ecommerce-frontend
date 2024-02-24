import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppState, useAppDispatch } from '../redux/store';
import {
  deleteProduct,
  fetchSingleProduct,
} from '../redux/slices/ProductSlice';
import ContentWrapper from '../components/contentWrapper/ContentWrapper';
import ProductDescription from '../components/productDetails/ProductDescription';
import ProductGallery from '../components/productDetails/ProductGallery';

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();

  const id = Number(productId);

  const { selectedSingleProduct, loading, error } = useSelector(
    (state: AppState) => state.products
  );

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  return (
    <ContentWrapper>
      <section className='py-10'>
        <div className='max-container'>
          {loading ? (
            <p>loading...</p>
          ) : error ? (
            <p>sorry for disruption due to error</p>
          ) : (
            selectedSingleProduct && (
              <section className='md:flex'>
                <ProductGallery productImages={selectedSingleProduct?.images} />
                <ProductDescription productData={selectedSingleProduct} />
              </section>
            )
          )}
        </div>
      </section>
    </ContentWrapper>
  );
};

export default ProductDetail;
