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
    setStock('');
  };

  useEffect(() => {
    const url = `https://financialmodelingprep.com/api/v3/search?query=${stock}&limit=10&apikey=${API_KEY}`;
    getSuggestions(url);
    console.log(suggestions);
  }, [stock]);

  return (
    <>
      <PageTitle>Search Any Stock</PageTitle>
      <form onSubmit={handleSubmit} className="flex justify-between p-2 my-8">
        <input
          type="text"
          id="stock"
          name="stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full bg-cool-gray-200 dark:bg-cool-gray-800 rounded-lg py-2 px-4 dark:text-white"
          placeholder="Enter any stock name or symbol like AAPL, Tesla"
        />
        <button
          type="submit"
          className="mx-2 p-2 text-white bg-purple-600 dark:bg-green-700 rounded-md focus:border-blue-300"
        >
          Search
        </button>
      </form>
      <CTA />
    </>
  );
};

export default Forms;
