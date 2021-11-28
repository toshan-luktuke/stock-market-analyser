import React from 'react';

const PageTitle = ({ children }) => {
  return (
    <h1 className="my-6 text-3xl lg:text-4xl font-black text-gray-700 dark:text-gray-200 font-head text-center tracking-widest">
      {children}
    </h1>
  );
};

export default PageTitle;
