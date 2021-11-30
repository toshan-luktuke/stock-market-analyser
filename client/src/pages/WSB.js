import React, { useState, useEffect } from 'react';

import { useFetch } from '../hooks/useFetch';
import PageTitle from '../components/Typography/PageTitle';

const WSB = () => {
  const url = 'http://localhost:5000/stock/wsb';
  const {
    recdata: { data: response },
    isLoading,
  } = useFetch(url);

  return (
    <>
      <PageTitle>r/WallStreetBets Sentiment Analysis</PageTitle>
      <div className="dark:text-white">
        the analysis will come here tomorrow
      </div>
    </>
  );
};

export default WSB;
