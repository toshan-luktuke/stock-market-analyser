import React from 'react';
import { useFetch } from '../hooks/useFetch';

const StockAnalysis = ({ name }) => {
  const url = `http://localhost:5000/stock/autosuggest/${name}`;
  const { recdata } = useFetch(url);
  if (recdata[0] !== undefined) {
    console.log(recdata[0]);
    return <div>{recdata[0].symbol}</div>;
  } else {
    return <div>Loading...</div>;
  }
};

export default StockAnalysis;
