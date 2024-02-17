import React, { ReactNode } from 'react';

const MainWrapper = ({ children }: { children: ReactNode }) => {
  return <main className='pt-[92px]'>{children}</main>;
};

export default MainWrapper;
