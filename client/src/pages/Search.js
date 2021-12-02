import React, { useState, useEffect } from 'react';
import { get } from 'axios';
import CTA from '../components/CTA';
import PageTitle from '../components/Typography/PageTitle';

const Forms = () => {
  const [stock, setStock] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = async (url) => {
    const { data } = await get(url);
    setSuggestions(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const url = `https://financialmodelingprep.com/api/v3/search-name?query=${stock}&limit=10&exchange=NASDAQ&apikey=${API_KEY}`;
    if (stock.length === 0) {
      setSuggestions([]);
    }
    if (stock.length >= 1) {
      getSuggestions(url);
    }
  }, [stock]);

  return (
    <>
      <PageTitle>Search Any Stock</PageTitle>
      <form
        onSubmit={handleSubmit}
        className="flex justify-between p-2 mt-8 mb-0"
        autoComplete="off"
      >
        <input
          type="text"
          id="stock"
          name="stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full bg-cool-gray-200 dark:bg-cool-gray-800 rounded-lg py-2 px-4 dark:text-white"
          placeholder="Enter any stock name or symbol like AAPL, Tesla"
          onBeforeInput={() => setSuggestions([])}
        />
        <button
          type="submit"
          className="mx-2 p-2 text-white bg-purple-600 dark:bg-green-700 rounded-md focus:border-blue-300"
          onClick={() => setSuggestions([])}
        >
          Search
        </button>
      </form>
      {suggestions &&
        stock.length > 0 &&
        suggestions.map((suggestion) => {
          return (
            <div
              key={suggestion.symbol}
              className="bg-cool-gray-200 dark:bg-cool-gray-800 dark:text-gray-200 py-2 px-4 ml-2 mr-24 cursor-pointer bg-opacity-50 hover:bg-gray-300 dark:hover:bg-cool-gray-600"
              onClick={() => {
                setStock(suggestion.name);
                setSuggestions((prev) => {
                  return [];
                });
              }}
              onBlur={() => {
                {
                  setTimeout(() => {
                    setSuggestions([]);
                  }, 100);
                }
              }}
            >
              <p className="text-sm">{suggestion.symbol}</p>
              <p className="text-xs">{suggestion.name}</p>
            </div>
          );
        })}
      <div className="mt-8">
        <CTA />
      </div>
    </>
  );
};

export default Forms;
