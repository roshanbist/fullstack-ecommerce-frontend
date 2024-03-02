import React, { ReactNode } from 'react';

const ContentWrapper = ({ children }: { children: ReactNode }) => {
  return <main className='pt-[79px] md:pt-[101px]'>{children}</main>;
};

export default ContentWrapper;
