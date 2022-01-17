import React, { useState } from 'react';
import { get } from 'axios';

import PageTitle from '../components/Typography/PageTitle';
import BasicIndianStockInfo from '../components/Cards/BasicIndianStockInfo';

const SearchIndian = () => {
  const [stock, setStock] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [symbol, setSymbol] = useState('');
  const [sector, setSector] = useState('');

  const getSuggestions = async (searchName) => {
    try {
      const { data } = await get(
        `http://localhost:5000/stock/indian/autosuggest/${searchName}`,
      );
      if (data.length > 10) {
        setSuggestions(data.slice(0, 10));
      } else {
        setSuggestions(data);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuggestions([]);
  };
  return (
    <>
      <PageTitle>Search Any Indian Stock</PageTitle>
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
          onInput={(e) => {
            setStock(e.target.value);
            if (e.target.value.length > 1) {
              getSuggestions(e.target.value);
            } else {
              setSuggestions([]);
            }
          }}
          className="w-full bg-cool-gray-200 dark:bg-cool-gray-800 rounded-lg py-2 px-4 dark:text-white"
          placeholder="Enter any stock name like Reliance, Tata"
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
        suggestions.map((suggestion) => {
          return (
            <div
              key={suggestion.symbol}
              className="bg-cool-gray-200 dark:bg-cool-gray-800 dark:text-gray-200 py-2 px-4 ml-2 mr-24 cursor-pointer bg-opacity-50 hover:bg-gray-300 dark:hover:bg-cool-gray-600"
              onClick={() => {
                setStock(suggestion.stock_name);
                setSymbol(suggestion.pdt_dis_nm);
                setSector(suggestion.sc_sector);
                setSuggestions([]);
              }}
              onBlur={() => {
                setTimeout(() => {
                  setSuggestions([]);
                }, 100);
              }}
            >
              <p className="text-sm">{suggestion.stock_name}</p>
              <p className="text-xs">{suggestion.sc_id}</p>
            </div>
          );
        })}
      {symbol && <BasicIndianStockInfo symbol={symbol} sector={sector} />}
    </>
  );
};

export default SearchIndian;
