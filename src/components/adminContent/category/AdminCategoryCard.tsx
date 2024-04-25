import React from 'react';

import { Category } from '../../../types/Category';
import { useAppDispatch } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';
import { deleteCategory } from '../../../redux/slices/CategorySlice';
// import { ImageUrlClear } from '../../../utils/ImageUrlClear';

const AdminCategoryCard = ({ categoryData }: { categoryData: Category }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //   const categoryImage = ImageUrlClear(categoryData.image[0]);

  const categoryDeleteHandler = async (id: string) => {
    await dispatch(deleteCategory(id));
  };

  return (
    <div className='bg-palette-accent rounded-sm shadow-sm border border-palette-accent'>
      <div className='block h-[200px] w-full overflow-hidden'>
        <img
          className='object-cover w-full h-full rounded-tr-sm rounded-tl-sm'
          src={categoryData.image}
          alt={categoryData.name}
        />
      </div>
      <div className='p-3 text-color-primary'>
        <h3 className='mb-3 text-lg font-bold'>{categoryData.name}</h3>
        <ul className='flex flex-wrap -mx-[5px]'>
          <li className='w-[50%] px-[5px]'>
            <button
              className='btn-primary min-w-0 w-full px-5 py-2 text-[14px] rounded-lg'
              onClick={() =>
                navigate(`/update-category/${categoryData._id}`, {
                  state: { categoryData },
                })
              }
            >
              Update
            </button>
          </li>
          <li className='w-[50%] px-[5px]'>
            <button
              className='btn-danger px-5 min-w-0 w-full text-[14px] rounded-lg'
              onClick={() => categoryDeleteHandler(categoryData._id)}
            >
              Delete
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminCategoryCard;
