import React, { ReactNode } from 'react';

const Wrapper = ({ children }: { children: ReactNode }) => {
  return <div className='overflow-hidden w-full relative'>{children}</div>;
};

export default Wrapper;
