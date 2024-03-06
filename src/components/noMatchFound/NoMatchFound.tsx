import React from 'react';

const NoMatchFound = ({ data }: { data: string }) => {
  return (
    <div className='animate-fade-in my-5 bg-palette-ebony border border-palette-accent text-color-primary p-10 shadow-lg rounded-lg text-lg font-medium text-center'>
      {data}
    </div>
  );
};

export default NoMatchFound;
