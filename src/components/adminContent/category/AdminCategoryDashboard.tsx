import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ContentWrapper from '../../contentWrapper/ContentWrapper';
import { AppState, useAppDispatch } from '../../../redux/store';
import { fetchAllCategories } from '../../../redux/slices/CategorySlice';
import Loader from '../../loader/Loader';
import NoMatchFound from '../../noMatchFound/NoMatchFound';
import AdminCategoryCard from './AdminCategoryCard';

const AdminCategoryDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { categories, categError, categLoading } = useSelector(
    (state: AppState) => state.categories
  );

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  return (
    <ContentWrapper>
      <div className='max-container py-10'>
        <section className='animate-fade'>
          <div className='flex flex-wrap justify-between items-center pb-6 mb-10 border-b border-b-palette-accent'>
            <h1 className='text-lg md:text-xl uppercase font-bold tracking-wide text-color-primary'>
              Manage Category
            </h1>
            <button
              className='btn-primary ml-3 rounded-xl'
              onClick={() => navigate('/admin/add-new-category')}
            >
              Add Category
            </button>
          </div>

          {categLoading ? (
            <Loader />
          ) : categories && categories.length > 0 ? (
            <div className='grid sm:grid-cols-3 lg:grid-cols-4 relative gap-5'>
              {categories.map((category) => (
                <AdminCategoryCard key={category._id} categoryData={category} />
              ))}
            </div>
          ) : (
            !categError &&
            categories.length === 0 && (
              <NoMatchFound data='Sorry, No Product found!' />
            )
          )}
        </section>
      </div>
    </ContentWrapper>
  );
};

export default AdminCategoryDashboard;
