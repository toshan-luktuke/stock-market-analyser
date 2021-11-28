import React from 'react';

const SectionTitle = ({ children }) => {
  return (
    <h2 className="mb-4 text-2xl font-black text-gray-600 dark:text-gray-300 font-mono">
      {children}
    </h2>
  );
};

export default SectionTitle;
