import React, { useState, useReducer, useEffect } from 'react';
import { get } from 'axios';
import PageTitle from '../components/Typography/PageTitle';
import CTA from '../components/CTA';

const Predictions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [stock, setStock] = useState('');
  const [symbol, setSymbol] = useState('');

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

  const getPredictions = async (symbol) => {
    try {
      const { data } = await get(`http://127.0.0.1:4000/stock_lr/${symbol}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
      console.log(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuggestions([]);
  };

  useEffect(() => {
    console.log(suggestions);
    console.log(stock);
    console.log(symbol);
  }, [suggestions]);

  return (
    <>
      <PageTitle>ML-Powered Stock Predictions</PageTitle>
      <form
        className="flex justify-between p-2 mt-8 mb-0"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          id="stock"
          name="stock"
          onInput={(e) => {
            setStock(e.target.value);
            if (e.target.value.length > 2) {
              getSuggestions(e.target.value);
            } else {
              setSuggestions([]);
            }
          }}
          value={stock}
          className="w-full bg-cool-gray-200 dark:bg-cool-gray-800 rounded-lg py-2 px-4 dark:text-white"
          placeholder="Enter any stock like Tesla, Apple"
        />
        <button
          type="submit"
          className="mx-2 p-2 text-white bg-purple-600 dark:bg-green-700 rounded-md focus:border-blue-300"
          onClick={() => setSuggestions([])}
        >
          Predict
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
                getPredictions(suggestion.symbol);
                setSuggestions([]);
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
      <div className="mt-8">
        <CTA />
      </div>
    </>
  );
};

export default Predictions;
