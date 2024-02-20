import React, { ReactNode } from 'react';

const ContentWrapper = ({ children }: { children: ReactNode }) => {
  return <main className='pt-[67px] md:pt-[92px]'>{children}</main>;
};

export default ContentWrapper;
