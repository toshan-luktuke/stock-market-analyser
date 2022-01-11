import React, { useState, useReducer, useEffect } from 'react';
import { get } from 'axios';
import PageTitle from '../components/Typography/PageTitle';
import CTA from '../components/CTA';
import reducer from '../state/suggestions';

const Predictions = () => {
  const [suggestions, dispatch] = useReducer(reducer, {
    id: false,
    suggestionList: [],
  });
  const [stock, setStock] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'CLEAR' });
  };

  useEffect(() => {
    console.log(suggestions);
    // dispatch({ type: 'NONE' });
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
            dispatch({ type: 'SUGGEST', payload: e.target.value });
          }}
          className="w-full bg-cool-gray-200 dark:bg-cool-gray-800 rounded-lg py-2 px-4 dark:text-white"
          placeholder="Enter any stock like Tesla, Apple"
        />
        <button
          type="submit"
          className="mx-2 p-2 text-white bg-purple-600 dark:bg-green-700 rounded-md focus:border-blue-300"
          onClick={() => dispatch({ type: 'CLEAR' })}
        >
          Predict
        </button>
      </form>
      {suggestions.suggestionList.length}
      {suggestions.suggestionList &&
        suggestions.suggestionList.map((suggestion) => {
          return (
            <div
              key={suggestion.symbol}
              className="bg-cool-gray-200 dark:bg-cool-gray-800 dark:text-gray-200 py-2 px-4 ml-2 mr-24 cursor-pointer bg-opacity-50 hover:bg-gray-300 dark:hover:bg-cool-gray-600"
              onClick={() => {
                setStock(suggestion.name);
                dispatch({ type: 'CLEAR' });
              }}
              onBlur={() => {
                setTimeout(() => {
                  dispatch({ type: 'CLEAR' });
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
