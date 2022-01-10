import React, { useState, useEffect } from 'react';
import { get } from 'axios';
import PageTitle from '../components/Typography/PageTitle';
import CTA from '../components/CTA';

const Predictions = () => {
  const [stock, setStock] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const getSuggestions = async (url) => {
    const { data } = await get(url);
    setSuggestions(data);
    console.log(data);
  };

  useEffect(() => {
    const url = `http://localhost:5000/stock/predautosuggest/${stock}`;
    if (stock.length === 0) {
      setSuggestions([]);
    } else if (stock.length > 2) {
      getSuggestions(url);
      console.log(suggestions);
    }
  }, [stock]);

  return (
    <>
      <PageTitle>ML-Powered Stock Predictions ⚡</PageTitle>
      <form
        className="flex justify-between p-2 mt-8 mb-0"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          id="stock"
          name="stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full bg-cool-gray-200 dark:bg-cool-gray-800 rounded-lg py-2 px-4 dark:text-white"
          placeholder="Enter any stock like Tesla, Apple"
          onBeforeInput={() => setSuggestions([])}
        />
        <button
          type="submit"
          className="mx-2 p-2 text-white bg-purple-600 dark:bg-green-700 rounded-md focus:border-blue-300"
          onClick={() => setSuggestions([])}
        >
          Predict
        </button>
      </form>
      <div className="mt-8">
        <CTA />
      </div>
    </>
  );
};

export default Predictions;
