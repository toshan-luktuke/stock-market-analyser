import React from 'react';

const CTA = () => {
  return (
    <a
      className="flex text-sm lg:text-lg items-center justify-around p-4 mb-8 font-semibold text-purple-100 bg-purple-600 dark:bg-green-600 shadow-md focus:outline-none focus:shadow-outline-purple"
      href="https://github.com/RushabhM03/Stock-market-predictor"
      target="_blank"
      rel="noopener noreferrer"
      style={{ borderRadius: '25% 15% / 90% 5%' }}
    >
      <div className="flex items-center">
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <span>Star our project on GitHub</span>
      </div>
      <span class="md:visible hidden">
        View here
        {/* eslint-disable-next-line react/no-danger */}
        <span dangerouslySetInnerHTML={{ __html: '&RightArrow;' }} />
      </span>
    </a>
  );
};

export default CTA;
