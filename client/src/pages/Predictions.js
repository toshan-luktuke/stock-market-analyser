import React, { useState, useReducer } from 'react';
import { get } from 'axios';
import PageTitle from '../components/Typography/PageTitle';
import CTA from '../components/CTA';
import reducer from '../state/suggestions';

const Predictions = () => {
  const [stock, setStock] = useState('');
  const [suggestions, dispatch] = useReducer(reducer, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'CLEAR' });
  };

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
      <div className="mt-8">
        <CTA />
      </div>
    </>
  );
};

export default Predictions;
