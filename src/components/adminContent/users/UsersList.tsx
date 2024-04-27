import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import ContentWrapper from '../../contentWrapper/ContentWrapper';
import { AppState, useAppDispatch } from '../../../redux/store';
import { getAllUsers } from '../../../redux/slices/UserSlice';
import Loader from '../../loader/Loader';
import UsersTable from './UsersTable';

const UsersList = () => {
  const dispatch = useAppDispatch();

  const { users, loading } = useSelector((state: AppState) => state.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <ContentWrapper>
      <div className='max-container py-10 md:py-12'>
        <h1 className='text-lg md:text-xl uppercase font-bold tracking-wide text-color-primary pb-6 mb-10 border-b border-b-palette-accent'>
          Users List
        </h1>
        <div>
          {loading === 'pending' ? (
            <Loader />
          ) : (
            users && users.length > 0 && <UsersTable users={users} />
          )}
        </div>
      </div>
    </ContentWrapper>
  );
};

export default UsersList;
