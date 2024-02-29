import React from 'react';
import ContentWrapper from '../components/contentWrapper/ContentWrapper';
import { useSelector } from 'react-redux';
import { AppState } from '../redux/store';

const Profile = () => {
  const loggedUserInfo = useSelector(
    (state: AppState) => state.users.loggedUser
  );

  return (
    <ContentWrapper>
      <div className='max-container'>
        <div className='py-10'>
          <div>{loggedUserInfo?.name}</div>
          <div>{loggedUserInfo?.email}</div>
          <div>{loggedUserInfo?.avatar}</div>
          <div>{loggedUserInfo?.role}</div>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default Profile;
