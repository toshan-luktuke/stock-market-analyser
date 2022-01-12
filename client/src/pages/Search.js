import React, { useState, useEffect, useRef } from 'react';
import { get } from 'axios';
import CTA from '../components/CTA';
import PageTitle from '../components/Typography/PageTitle';

const Forms = () => {
  const [stock, setStock] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [symbol, setSymbol] = useState('');
  const [loading, setLoading] = useState(false);

  const getSuggestions = async (searchName) => {
    try {
      const { data } = await get(
        `http://127.0.0.1:5000/stock/predautosuggest/${searchName}`,
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

  const getStockDetails = async (symbolize) => {
    try {
      let { data } = await get(
        `http://localhost:5000/stock/details/${symbolize}`,
      );
      let { data: ratings } = await get(
        `http://localhost:5000/stock/rating/${symbolize}`,
      );
      setLoading(false);
      if (data) {
        data = data.data;
      }
      if (ratings) {
        ratings = ratings.data;
      }
      console.log(data);
      console.log(ratings);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuggestions([]);
    setLoading(true);
  };

  useEffect(() => {
    console.log(suggestions);
    console.log(stock);
    console.log(symbol);
  }, [suggestions]);

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
          onInput={(e) => {
            setStock(e.target.value);
            if (e.target.value.length > 1) {
              getSuggestions(e.target.value);
            } else {
              setSuggestions([]);
            }
          }}
          className="w-full bg-cool-gray-200 dark:bg-cool-gray-800 rounded-lg py-2 px-4 dark:text-white"
          placeholder="Enter any stock name or symbol like AAPL, Tesla"
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
                setStock(suggestion.name);
                setSymbol(suggestion.symbol);
                getStockDetails(suggestion.symbol);
                setSuggestions([]);
                setLoading(true);
              }}
              onBlur={() => {
                setTimeout(() => {
                  setSuggestions([]);
                }, 100);
              }}
            >
              <p className="text-sm">{suggestion.symbol}</p>
              <p className="text-xs">{suggestion.name}</p>
            </div>
          );
        })}
      {symbol && <p>Hello</p>}
      {loading && (
        <p className="dark:text-white text-center animate__animated animate__flash animate__infinite">
          Loading...
        </p>
      )}
    </>
  );
};

export default Forms;
