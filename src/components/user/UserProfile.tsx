import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ContentWrapper from '../contentWrapper/ContentWrapper';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { AppState, useAppDispatch } from '../../redux/store';
import { getLoggedUserInfo } from '../../redux/slices/UserSlice';
import UserAvatar from '../../assets/images/avatar.png';
import Loader from '../loader/Loader';

const UserProfile = () => {
  const loggedUserInfo = useSelector(
    (state: AppState) => state.users.loggedUser
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loggedUserInfo) {
      dispatch(getLoggedUserInfo());
    }
  }, [dispatch, loggedUserInfo]);

  return (
    <ContentWrapper>
      <div className='max-container'>
        {!loggedUserInfo ? (
          <Loader />
        ) : (
          <section className='py-10 md:py-14'>
            <div className='max-w-[700px] mx-auto bg-palette-ebony border-1 border-palette-accent shadow-lg animate-fade'>
              <div className='py-10 bg-blue-600 flex justify-center items-center flex-col relative'>
                <div className='w-[250px] h-[250px] rounded-full overflow-hidden mb-5 bg-gray-300'>
                  <img
                    className='w-full h-full object-cover animate-fade'
                    src={
                      loggedUserInfo?.avatar
                        ? loggedUserInfo?.avatar
                        : UserAvatar
                    }
                    alt={loggedUserInfo?.username}
                  />
                </div>
                <button
                  className='w-[60px] h-[60px] absolute -bottom-[30px] right-[30px] shadow-lg rounded-full flex justify-center items-center text-white bg-[#db7f1c] hover:bg-[#cb7416] text-[25px] transition-colors duration-300 ease-in-out'
                  onClick={() =>
                    navigate(`/edit-profile/${loggedUserInfo?._id}`, {
                      state: { loggedUserInfo },
                    })
                  }
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
              </div>
              <div className='py-5'>
                <div className='px-5 mb-5 pb-5 border-b border-b-palette-accent text-color-primary'>
                  <p className='font-medium text-lg'>Name</p>
                  <p className='text-lg capitalize'>{`${loggedUserInfo?.firstname} ${loggedUserInfo?.lastname}`}</p>
                </div>
                <div className='px-5 mb-5 pb-5 border-b border-b-palette-accent text-color-primary'>
                  <p className='font-medium text-lg'>Username</p>
                  <p className='text-lg'>{loggedUserInfo?.username}</p>
                </div>
                <div className='px-5 mb-5 pb-5 border-b border-b-palette-accent text-color-primary'>
                  <p className='font-medium text-lg'>Address</p>
                  <p className='text-lg capitalize'>
                    {loggedUserInfo?.address}
                  </p>
                </div>
                <div className='px-5 mb-5 pb-5 border-b border-b-palette-accent text-color-primary'>
                  <p className='font-medium text-lg'>Email</p>
                  <p className='text-lg'>{loggedUserInfo?.email}</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </ContentWrapper>
  );
};

export default UserProfile;
