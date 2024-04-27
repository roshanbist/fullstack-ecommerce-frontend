import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { UserType } from '../../../types/User';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from '../../../redux/store';
import { deleteUserById } from '../../../redux/slices/UserSlice';

const UsersTable = ({ users }: { users: UserType[] }) => {
  const dispatch = useAppDispatch();

  const deleteUserHandler = (id: string) => {
    dispatch(deleteUserById(id));
  };

  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <table className='w-full text-sm text-center text-color-primary'>
        <thead className='uppercase bg-palette-ebony'>
          <tr>
            <th className='px-6 py-3'>Id</th>
            <th className='px-6 py-3'>First Name</th>
            <th className='px-6 py-3'>Last Name</th>
            <th className='px-6 py-3'>Username</th>
            <th className='px-6 py-3'>Email</th>
            <th className='px-6 py-3'>Role</th>
            <th className='px-6 py-3'>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user._id}
              className={`${(index + 1) % 2 === 0 ? 'bg-palette-ebony' : ''}`}
            >
              <td className='px-6 py-3'>{user._id}</td>
              <td className='px-6 py-3 capitalize'>{user.firstname}</td>
              <td className='px-6 py-3 capitalize'>{user.lastname}</td>
              <td className='px-6 py-3'>{user.username}</td>
              <td className='px-6 py-3'>{user.email}</td>
              <td className='px-6 py-3'>{user.role}</td>
              <td className='px-6 py-3 text-red-600'>
                <button
                  className=''
                  onClick={() => deleteUserHandler(user._id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
