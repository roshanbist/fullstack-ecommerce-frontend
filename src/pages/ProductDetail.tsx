import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppState, useAppDispatch } from '../redux/store';
import { fetchSingleProduct } from '../redux/slices/ProductSlice';
import ContentWrapper from '../components/contentWrapper/ContentWrapper';
import ProductDescription from '../components/product/ProductDescription';
import ProductGallery from '../components/product/ProductGallery';
import GoBackButton from '../components/goBackButton/GoBackButton';

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();

  const id = Number(productId);

  const { selectedSingleProduct, loading, error } = useSelector(
    (state: AppState) => state.products
  );

  // console.log('product detail single product', selectedSingleProduct);

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
              <>
                <GoBackButton />
                <section className='md:flex'>
                  <ProductGallery
                    productImages={selectedSingleProduct?.images}
                  />
                  <ProductDescription productData={selectedSingleProduct} />
                </section>
              </>
            )
          )}
        </div>
      </section>
    </ContentWrapper>
  );
};

export default ProductDetail;
