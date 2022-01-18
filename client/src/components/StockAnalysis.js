import React from 'react';
import { useFetch } from '../hooks/useFetch';
import BasicStockInfo from './Cards/BasicStockInfo';

const StockAnalysis = ({ name }) => {
  const url = `https://stock-market-analyser-backend.herokuapp.com/stock/autosuggest/${name}`;
  const { recdata } = useFetch(url);
  if (recdata[0] !== undefined) {
    console.log(recdata[0]);
    return (
      <>
        <BasicStockInfo symbol={recdata[0].symbol} />
      </>
    );
  } else {
    return (
      <p className="dark:text-white text-center animate__animated animate__flash animate__infinite">
        Loading...
      </p>
    );
  }
};

export default StockAnalysis;
